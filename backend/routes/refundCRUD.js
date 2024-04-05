//CRUD Tested
const express = require("express");
const router = express.Router();
const Refund = require("../models/refund");
const mongoose = require('mongoose');

// Create a new refund
router.post("/refund-add", async (req, res) => {
    try {
        const { order_id, account_holder, account_sort_code, account_number, amount } = req.body;

        const newRefund = new Refund({
            order_id,
            account_holder,
            account_sort_code,
            account_number,
            amount,
        });

        await newRefund.save();
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
