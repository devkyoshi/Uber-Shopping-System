//CRUD Tested

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Add payment details to a certain order document
router.post("/pay/:orderId/add-payment", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { payment_method, payment_amount, payment_status } = req.body;

        const paymentId = new ObjectId()

        // Update the order document with the provided payment details
        await Order.findByIdAndUpdate(orderId, {
            payment: {
                _id:paymentId,
                payment_method,
                payment_amount,
                paid_time: new Date(), 
                payment_status
            }
        });

        // Send response
        res.json("Payment details added to the order successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding payment details to the order" });
    }
});

// Update payment details for a certain order document
router.put("/pay/:orderId/update-payment", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { payment_method, payment_amount, payment_status } = req.body;

        // Update the order document with the provided payment details
        await Order.findByIdAndUpdate(orderId, {
            $set: {
                "payment.payment_method": payment_method,
                "payment.payment_amount": payment_amount,
                "payment.paid_time": new Date(),
                "payment.payment_status": payment_status
            }
        });

        // Send response
        res.json("Payment details updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating payment details" });
    }
});

// Delete payment details for a certain order document
router.delete("/pay/:orderId/delete-payment", async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Update the order document to remove payment details
        await Order.findByIdAndUpdate(orderId, {
            $unset: {
                payment: ""
            }
        });

        // Send response
        res.json("Payment details deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting payment details" });
    }
});

// Read payment details for a certain order document
router.get("/pay/:orderId/payment-details", async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Find the order document by its ID
        const order = await Order.findById(orderId);

        // Check if the order exists
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Get payment details from the order document
        const paymentDetails = order.payment;

        // Send response with payment details
        res.json(paymentDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching payment details" });
    }
});




module.exports = router;
