//CRUD Tested
//Created by Prasad H.G.A.T (IT22056870)

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Add payment details to a certain order document(cash)
router.post("/pay-cash/:orderId/add-payment", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { email, payment_amount, district, address, postal_code } = req.body;

    const paymentId = new ObjectId(); // Generate new ObjectId for payment

    // Update the order document with the provided payment details
    await Order.findByIdAndUpdate(orderId, {
      cash_payment: {
        // Update cash_payment field specifically
        _id: paymentId,
        payment_method: "cash",
        email,
        payment_amount,
        district,
        address,
        postal_code,
        paid_time: new Date(),
        payment_status: "Pending",
      },
    });
    // Send response
    res.json("Payment details added to the order successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding payment details to the order",
    });
  }
});

// Update payment details for a certain order document(cash)
router.put("/pay-cash/:orderId/update-payment/:paymentId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const paymentId = req.params.paymentId;

    const {
      email,
      payment_amount,
      district,
      address,
      postal_code,
      payment_status,
    } = req.body;

    // Update the payment details within the order document
    await Order.findOneAndUpdate(
      { _id: orderId, "cash_payment._id": paymentId },
      {
        $set: {
          "cash_payment.email": email,
          "cash_payment.payment_amount": payment_amount,
          "cash_payment.district": district,
          "cash_payment.address": address,
          "cash_payment.postal_code": postal_code,
          "cash_payment.payment_status": payment_status,
          "cash_payment.updated_time": new Date(),
        },
      }
    );

    res.json("Payment details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating payment details",
    });
  }
});

// Delete payment details from a certain order document(cash)
router.delete(
  "/pay-cash/:orderId/delete-payment/:paymentId",
  async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const paymentId = req.params.paymentId;

      // Delete the payment details from the order document
      await Order.findOneAndUpdate(
        { _id: orderId },
        { $unset: { cash_payment: paymentId } }
      );

      res.json("Payment details deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while deleting payment details",
      });
    }
  }
);

// Add payment details to a certain order document(card)
router.post("/pay-card/:orderId/add-payment", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const { email, account_number, exp, cvc, account_holder, payment_amount } =
      req.body;

    const paymentId = new ObjectId(); // Generate new ObjectId for payment

    // Update the order document with the provided payment details
    await Order.findByIdAndUpdate(orderId, {
      card_payment: {
        _id: paymentId,
        payment_method: "card",
        email,
        account_number,
        exp,
        cvc,
        account_holder,
        payment_amount,
        paid_time: new Date(),
        payment_status: "Pending",
      },
    });

    res.json("Card payment details added to the order successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding card payment details to the order",
    });
  }
});

// Update payment details for a certain order document(card)
router.put("/pay-card/:orderId/update-payment/:paymentId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const paymentId = req.params.paymentId;

    const {
      email,
      account_number,
      exp,
      cvc,
      account_holder,
      payment_amount,
      payment_status,
    } = req.body;

    // Update the payment details within the order document
    await Order.findOneAndUpdate(
      { _id: orderId, "card_payment._id": paymentId },
      {
        $set: {
          "card_payment.email": email,
          "card_payment.account_number": account_number,
          "card_payment.exp": exp,
          "card_payment.cvc": cvc,
          "card_payment.account_holder": account_holder,
          "card_payment.payment_amount": payment_amount,
          "card_payment.payment_status": payment_status,
          "card_payment.updated_time": new Date(),
        },
      }
    );

    res.json("Card payment details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating card payment details",
    });
  }
});

// Delete payment details from a certain order document(card)
router.delete(
  "/pay-card/:orderId/delete-payment/:paymentId",
  async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const paymentId = req.params.paymentId;

      // Delete the payment details from the order document
      await Order.findOneAndUpdate(
        { _id: orderId },
        { $unset: { card_payment: paymentId } }
      );

      res.json("Card payment details deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while deleting card payment details",
      });
    }
  }
);

// Read all payment details for a certain order document(card)
router.get("/payments/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find the order document
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Combine cash and card payments and send them as response
    const payments = {
      cash_payment: order.cash_payment || null,
      card_payment: order.card_payment || null,
    };

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching payment details",
    });
  }
});

module.exports = router;
