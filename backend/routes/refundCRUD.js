//CRUD Tested
const express = require("express");
const router = express.Router();
const Refund = require("../models/refund");
const mongoose = require("mongoose");
const Order = require("../models/order");
const Complaint = require("../models/complaint");
// const Revenue = require("../models/revenue");

/*          "customer_id":"6607f3c6de3ed9ef425cf30d",
            "order_id":"66120fc9f7b97eacbe3cb331",
            "payment_id":"661238bd0c4e07f0981e0433",
            "complaint_type":"expired",
            "item_id":"6607f3c6de3ed9ef425cf30d",
            "resolving_option":"replacement",
            "complaint_img":"url",
            "quantity":"2.1kg",
            "complaint_status":"accepted" */

// Route to handle refund form submission
router.post("/refund-add", async (req, res) => {
  try {
    const {
      order_id,
      complaint_id,
      account_holder,
      account_sort_code,
      account_number,
      amount,
    } = req.body;

    // Check if required fields are provided
    if (
      !order_id ||
      !complaint_id ||
      !account_holder ||
      !account_sort_code ||
      !account_number ||
      !amount
    ) {
      return res.status(400).json({ message: "Provide all required fields" });
    }

    // Check if the order_id and complaint_id exist and are valid references
    const orderExists = await Order.exists({ _id: order_id });
    const complaintExists = await Complaint.exists({ _id: complaint_id });

    if (!orderExists || !complaintExists) {
      return res
        .status(400)
        .json({ message: "Invalid order ID or complaint ID" });
    }

    // Account number and sort code validation
    const accountNumberRegex = /^[0-9]{10}$/; // Example regex for 10-digit account number
    const sortCodeRegex = /^[0-9]{9}$/; // Example regex for 9-digit sort code

    if (
      !accountNumberRegex.test(account_number) ||
      !sortCodeRegex.test(account_sort_code)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid account number or sort code format" });
    }

    //Amount validation
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount must a positive number" });
    }

    // const refundId = new ObjectId(); // Generate new ObjectId for refund

    // Create a new refund object
    const newRefund = new Refund({
      order_id,
      complaint_id,
      account_holder,
      account_sort_code,
      account_number,
      amount,
    });

    //Starts: Prasad H.G.A.T (I added this part to get refund amounts to revenue)
    // let revenue = await Revenue.findOne();
    // if (!revenue) {
    //   revenue = new Revenue({
    //     total_revenue: amount,
    //     refunds: [{ _id: paymentId, time_stamp: Date.now() }],
    //   });
    // } else {
    //   // Add the refund amount to the existing total revenue
    //   revenue.total_revenue -= amount;
    //   // Record refund details
    //   revenue.refunds.push({ _id: refundId, time_stamp: Date.now() });
    // }
    //Ends: Prasad H.G.A.T (I added this part to get refund amounts to revenue)

    // Save the refund object to the database
    await newRefund.save();

    // Return a success message with a reference to the newly created refund
    res.json("Refund Added");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
});

// Update an existing refund
router.put("/refund-update/:refundID", async (req, res) => {
  try {
    const { refundID } = req.params;
    const {
      order_id,
      complaint_id,
      account_holder,
      account_sort_code,
      account_number,
      amount,
    } = req.body;

    const updatedRefund = await Refund.findByIdAndUpdate(
      refundID,
      {
        order_id,
        complaint_id,
        account_holder,
        account_sort_code,
        account_number,
        amount,
      },
      { new: true }
    );

    if (!updatedRefund) {
      return res.status(404).json({ error: "Refund not found" });
    }

    res.json(updatedRefund);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the Refund" });
  }
});

// Delete an existing refund
router.delete("/refund-delete/:refundID", async (req, res) => {
  try {
    const { refundID } = req.params;
    const deleted = await Refund.findByIdAndDelete(refundID);

    if (!deleted) {
      return res.status(404).json({ error: "Refund not found" });
    }

    res.json({ message: "Refund deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Refund" });
  }
});

// Read all refunds
router.get("/refund-all", async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.json(refunds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Refund" });
  }
});

// Read a refund by ID
router.get("/refund/:refundID", async (req, res) => {
  try {
    const { refundID } = req.params;
    const refund = await Refund.findById(refundID);

    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }

    res.json(refund);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Refund" });
  }
});

module.exports = router;
