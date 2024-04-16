
//chanmige nama

const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const mongoose = require('mongoose');
const Refund = require("../models/refund")
const upload = require('./multerConfig');
const fs = require('fs');

/*
            "order_id":"66120fc9f7b97eacbe3cb331",
            "complaint_id":"66162d4584931d86219f6d51",
            "account_holder":"Chanmi",
            "account_sort_code":123456780,
            "account_number":1234567890,
            "amount":10000

*/

// Create a new complaint 
  router.post("/complaint-add", upload.single('complaint_img'), async (req, res) => {
    try {
      const { customer_id, order_id, payment_id, complaint_type, item_id, resolving_option, quantity, description, complaint_status } = req.body;
      const complaint_img = req.file.path; // Save the file path in the database
  
      const newComplaint = new Complaint({
        customer_id,
        order_id,
        payment_id,
        complaint_type,
        item_id,
        resolving_option,
        complaint_img,
        quantity,
        description,
        complaint_status,
        created_at: Date.now(),
        updated_at: Date.now()
      });
  
      await newComplaint.save();
      res.json("Complaint Added");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the customer" });
    }
  });

// Update an existing complaint
router.put("/complaint-update/:complaintID",  upload.single('complaint_img') ,async (req, res) => {
    try {
        const { complaintID } = req.params;
        const { customer_id, order_id, payment_id ,complaint_type ,item_id ,resolving_option , quantity,description, complaint_status} = req.body;
        const complaint_img = req.file ? req.file.path : undefined;

        // Find the complaint to get the previous image path
        const complaint = await Complaint.findById(complaintID);
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        // Delete the previous image file if it exists
        if (complaint.complaint_img && fs.existsSync(complaint.complaint_img)) {
            fs.unlinkSync(complaint.complaint_img);
        }


        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintID, {
            customer_id,
            order_id,
            payment_id,
            complaint_type,
            item_id,
            resolving_option,
            complaint_img,
            quantity,
            description,
            complaint_status,
            updated_at: Date.now()

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

       // Delete the image file if it exists
       if (deletedComplaint.complaint_img) {
        if (fs.existsSync(deletedComplaint.complaint_img)) {
            fs.unlinkSync(deletedComplaint.complaint_img);
        } else {
            console.log(`Image file not found: ${deletedComplaint.complaint_img}`);
        }
    }

        res.json({ message: "Complaint deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Complaint" });
    }
});

// Delete an existing complaint image
router.delete("/complaint-deleteimg/:complaintID", async (req, res) => {
    try {
        const { complaintID } = req.params;
        const deletedComplaint = await Complaint.findById(complaintID)

       // Delete the image file if it exists
       if (deletedComplaint.complaint_img) {
        if (fs.existsSync(deletedComplaint.complaint_img)) {
            fs.unlinkSync(deletedComplaint.complaint_img);
        } else {
            console.log(`Image file not found: ${deletedComplaint.complaint_img}`);
        }
    }

       // Remove the complaint_img attribute from the complaint document
       deletedComplaint.complaint_img = '';
       await deletedComplaint.save();

       res.json({ message: "Complaint image and attribute deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Complaint" });
    }
});

// Read all complaint
router.get("/complaint-all", async (req, res) => {
    try {
        // Fetch all complaint IDs from refunds
        const refundedComplaintIds = await Refund.distinct("complaint_id");
        const complaint = await Complaint.find({ _id: { $nin: refundedComplaintIds } }).sort({ updated_at: -1 }).select('order_id complaint_status item_id quantity resolving_option');
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
        const imageURL = `${complaint.complaint_img}`// Concatenate the base URL with the image filename

        // Add the imageURL to the complaint object before sending the response
        const complaintWithImage ={
            ...complaint.toObject(),// Convert Mongoose document to plain JavaScript object
            imageURL
        }

        res.json(complaintWithImage);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the Complaint" });
    }
});

module.exports = router;
