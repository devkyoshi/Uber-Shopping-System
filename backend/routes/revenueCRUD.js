const express = require("express");
const router = express.Router();
const Revenue = require("../models/revenue");

//Method to add payment records
router.post("/add-payment", async (req, res) => {
  try {
    const { payment_id, payment_amount } = req.body;

    // Find the existing revenue document (should be only one)
    let revenue = await Revenue.findOne();

    // If no revenue document exists, create a new one with the payment amount
    if (!revenue) {
      revenue = new Revenue({
        total_revenue: payment_amount,
        payments: [{ payment_id, time_stamp: Date.now() }],
      });
    } else {
      // Add the payment amount to the existing total revenue
      revenue.total_revenue += payment_amount;
      // Record payment details
      revenue.payments.push({ payment_id, time_stamp: Date.now() });
    }

    // Save the updated or new revenue document
    await revenue.save();

    res.status(200).json({ message: "Payment amount added to total revenue" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding payment amount to total revenue",
    });
  }
});

//Method to add refund records
router.post("/add-refund", async (req, res) => {
  try {
    const { refund_id, refund_amount } = req.body;

    // Find the existing revenue document (should be only one)
    let revenue = await Revenue.findOne();

    // If no revenue document exists or if refund amount is greater than total revenue, return error
    if (!revenue || refund_amount > revenue.total_revenue) {
      return res.status(400).json({ error: "Invalid refund amount" });
    }

    // Deduct the refund amount from the existing total revenue
    revenue.total_revenue -= refund_amount;
    // Record refund details
    revenue.refunds.push({ refund_id, time_stamp: Date.now() });

    // Save the updated revenue document
    await revenue.save();

    res
      .status(200)
      .json({ message: "Refund amount deducted from total revenue" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while deducting refund amount from total revenue",
    });
  }
});

// Method to remove payment records
router.delete("/remove-payment/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Find the existing revenue document (should be only one)
    const revenue = await Revenue.findOne();

    // If no revenue document exists, return an error
    if (!revenue) {
      return res.status(404).json({ error: "Revenue document not found" });
    }

    // Find the payment record to remove
    const paymentIndex = revenue.payments.findIndex(
      (payment) => payment.payment_id === paymentId
    );

    // If the payment record is not found, return an error
    if (paymentIndex === -1) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    // Get the payment amount to subtract from the total revenue
    const paymentAmountToRemove = revenue.payments[paymentIndex].payment_amount;

    // Remove the payment record from the revenue document
    revenue.payments.splice(paymentIndex, 1);

    // Subtract the payment amount from the total revenue
    revenue.total_revenue -= paymentAmountToRemove;

    // Save the updated revenue document
    await revenue.save();

    res.status(200).json({ message: "Payment record removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while removing payment record",
    });
  }
});

module.exports = router;
