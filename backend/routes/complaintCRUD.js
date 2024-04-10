
//chanmige nama

const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const mongoose = require('mongoose');

// Create a new complaint
router.post("/complaint-add", async (req, res) => {
    try {
        const {customer_id,order_id, payment_id ,complaint_type ,item_id ,resolving_option , complaint_img, quantity, complaint_status} = req.body;

        const newComplaint = new Complaint({
            customer_id,
            order_id,
            payment_id,
            complaint_type,
            item_id,
            resolving_option,
            complaint_img,
            quantity, 
            complaint_status
        });

        await newComplaint.save();
        res.json("Complaint Added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the customer" });
    }
});

// Update an existing complaint
router.put("/complaint-update/:complaintID", async (req, res) => {
    try {
        const { complaintID } = req.params;
        const {  order_id, payment_id ,complaint_type ,item_id ,resolving_option , complaint_img, quantity, complaint_status} = req.body;

        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintID, {
            order_id,
            payment_id,
            complaint_type,
            item_id,
            resolving_option,
            complaint_img,
            quantity, 
            complaint_status

        }, { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        res.json(updatedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Complaint" });
    }
});

// Delete an existing complaint
router.delete("/complaint-delete/:complaintID", async (req, res) => {
    try {
        const { complaintID } = req.params;
        const deletedComplaint = await Complaint.findByIdAndDelete(complaintID);

        if (!deletedComplaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Complaint" });
    }
});

// Read all complaint
router.get("/complaint-all", async (req, res) => {
    try {
        const complaint = await Complaint.find().select('order_id complaint_status item_id quantity resolving_option ');
        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching Complaint" });
    }
});

// Read a complaint by ID
router.get("/complaint/:complaintID", async (req, res) => {
    try {
        const { complaintID } = req.params;
        const complaint = await Complaint.findById(complaintID); 
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }
        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the Complaint" });
    }
});

module.exports = router;
