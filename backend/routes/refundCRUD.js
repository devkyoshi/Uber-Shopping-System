//CRUD Tested
const express = require("express");
const router = express.Router();
const Refund = require("../models/refund");
const mongoose = require('mongoose');
const Order = require("../models/order")
const Complaint = require("../models/complaint")


// Route to handle refund form submission
router.post("/refund-add", async (req, res) => {
    try {
        const { order_id, complaint_id, account_holder, account_sort_code, account_number, amount } = req.body;

        // Check if required fields are provided
        if(!order_id || !complaint_id || !account_holder || !account_sort_code || !account_number || !amount){
            return res.status(400).json({message:'Provide all required fields'});
        }

        // Check if the order_id and complaint_id exist and are valid references
        const orderExists = await Order.exists({_id:order_id});
        const complaintExists = await Complaint.exists({_id:complaint_id});

        if(!orderExists || !complaintExists){
            return res.status(400).json({message:'Invalid order ID or complaint ID'});
        }

        // Account number and sort code validation
        const accountNumberRegex = /^[0-9]{10}$/; // Example regex for 8-digit account number
        const sortCodeRegex = /^[0-9]{9}$/; // Example regex for 6-digit sort code

        if (!accountNumberRegex.test(account_number) || !sortCodeRegex.test(account_sort_code)) {
            return res.status(400).json({ message: 'Invalid account number or sort code format' });
        }

        // Create a new refund object
        const newRefund = new Refund({
            order_id,
            complaint_id,
            account_holder,
            account_sort_code,
            account_number,
            amount,
        });

        // Save the refund object to the database
        await newRefund.save();

        // Return a success message with a reference to the newly created refund
        res.json("Refund Added");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the customer" });
    }
});

// Update an existing refund
router.put("/refund-update/:refundID", async (req, res) => {
    try {
        const { refundID } = req.params;
        const { order_id, account_holder, account_sort_code, account_number, amount } = req.body;

        const updatedRefund = await Refund.findByIdAndUpdate(refundID, {
            order_id,
            account_holder,
            account_sort_code,
            account_number,
            amount,
        }, { new: true });

        if (!updatedRefund) {
            return res.status(404).json({ error: "Refund not found" });
        }

        res.json(updatedRefund);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Refund" });
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
        res.status(500).json({ error: "An error occurred while deleting the Refund" });
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
        res.status(500).json({ error: "An error occurred while fetching the Refund" });
    }
});

module.exports = router;
