
//chanmige nama

const express = require("express");
const router = express.Router();
const Complaint = require("../models/complaint");
const mongoose = require('mongoose');
const Refund = require("../models/refund")
const upload = require('./multerConfig');
const Order = require('../models/order')
const fs = require('fs');

/*
            "order_id":"66120fc9f7b97eacbe3cb331",
            "complaint_id":"66162d4584931d86219f6d51",
            "account_holder":"Chanmi",
            "account_sort_code":123456780,
            "account_number":1234567890,
            "amount":10000

*/

// ---------------------------------------------CREATE A NEW COMPLAINT-------------------------------------------------------------

  router.post("/complaint-add", upload.single('complaint_img'), async (req, res) => {
    try {
      // Extract data from request body
      const { customer_id, order_id, payment_id, complaint_type, item_id, resolving_option, quantity, description, complaint_status } = req.body;
      const complaint_img = req.file.path; // Save the file path in the database

      // Find the order by ID
    const order = await Order.findById(order_id);

    if (!order) {
      return res
      .status(404)
      .json({ error: "Order not found" });
    }

    // Find the item within the order by its ID
    const item = order.items.find(item => item.item_id.toString() === item_id);

    if (!item) {
      return res
      .status(404)
      .json({ error: "Item not found in order" });
    }

    // Extract the quantity of the item from the order
    const orderQuantity = item.quantity;

    if(orderQuantity<quantity){
        return res
        .status(400)
        .json({ error: "Quantity is larger than the purchased quantity"});
    }


    // Check if the customer has already submitted a complaint for this item
    const existingComplaint = await Complaint.findOne({
        customer_id,
        order_id,
        item_id,
        complaint_status: { $ne: "Resolved" } // Exclude resolved complaints
    });

    if (existingComplaint) {
        return res.status(400).json({ error: "You have already submitted a complaint for this item" });
    }

     //Check if required fields are provided
    if (
        !customer_id ||
        !order_id ||
        !payment_id ||
        !complaint_type ||
        !item_id ||
        !resolving_option ||
        !quantity ||
        !description ||
        !complaint_img
      ) {
        return res.status(400).json({ error: "Provide all required fields" });
      }
  
      // Create new complaint instance
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

      // Save the new complaint
      await newComplaint.save();
      res.json({ message: "Complaint Added" });


    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the customer" });
    }
  });

// ---------------------------------------------UPDATE AN EXISTING COMPLAINT-------------------------------------------------------------

router.put("/complaint-update/:complaintID",  upload.single('complaint_img') ,async (req, res) => {
    try {
        // Extract complaintID from request parameters
        const { complaintID } = req.params;
        // Extract data from request body
        const { customer_id, order_id, payment_id ,complaint_type ,item_id ,resolving_option , quantity,description, complaint_status} = req.body;
        // Get the new complaint image path, if available
        const complaint_img =req.file ? req.file.path:undefined;

        // Find the complaint to update
        const complaint = await Complaint.findById(complaintID);
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        // Delete the previous image file if it exists
        if (complaint.complaint_img && fs.existsSync(complaint.complaint_img)) {
            fs.unlinkSync(complaint.complaint_img);
        }

        // Check if required fields are provided
        if (
            !customer_id ||
            !order_id ||
            !payment_id ||
            !complaint_type ||
            !item_id ||
            !resolving_option ||
            !quantity ||
            !description
        ) {
            return res.status(400).json({ error: "Provide all required fields" });
        }

        // Find the order by ID
        const order = await Order.findById(order_id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Find the item within the order by its ID
        const item = order.items.find(item => item.item_id.toString() === item_id);
        if (!item) {
            return res.status(404).json({ error: "Item not found in order" });
        }

        // Extract the quantity of the item from the order
        const orderQuantity = item.quantity;
        if (orderQuantity < quantity) {
            return res.status(400).json({ error: "Quantity is larger than the purchased quantity" });
        }


        // Update the complaint
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

// ---------------------------------------------DELETE AN EXISTING COMPLAINT-----------------------------------------------------------

router.delete("/complaint-delete/:complaintID", async (req, res) => {
    try {
        // Extract complaintID from request parameters
        const { complaintID } = req.params;
        // Find and delete the complaint
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
  

// ---------------------------------------------READ ALL COMPLAINTS TO CUSTOMER VIEW------------------------------------------------------------------------

router.get("/complaint-all/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Fetch all complaint IDs from refunds
        const refundedComplaintIds = await Refund.distinct("complaint_id");
        const complaint = await Complaint.find({
             _id: { $nin: refundedComplaintIds },
             customer_id: id
            }).sort({ updated_at: -1 }).select('order_id complaint_status item_id quantity resolving_option');
        res.json(complaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching Complaint" });
    }
});


// ---------------------------------------------READ ALL COMPLAINTS TO ADMIN VIEW-------------------------------------------------------------

router.get("/complaint-alladmin", async (req, res) => {
    try {
        // Find all pending complaints and sort by date
        const complaints = await Complaint.find({ complaint_status: "pending" }).sort({ updated_at: -1 });

        // Check if there are no complaints
        if (complaints.length === 0) {
            return res.status(404).json({ error: "No complaints found" });
        }


        // Map each complaint to add imageURL to the complaint object
        const complaintsWithImages = complaints.map(complaint => {
            const imageURL = `${complaint.complaint_img}`
            return {
                ...complaint.toObject(), // Convert Mongoose document to plain JavaScript object
                imageURL
            };
        });

        // Send the response with the array of complaints with imageURLs
        res.json(complaintsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching complaints" });
    }
});

// ---------------------------------------------READ COMPLAINT BY ID-------------------------------------------------------------

router.get("/complaint/:complaintID", async (req, res) => {
    try {
        // Extract complaintID from request parameters
        const { complaintID } = req.params;
         // Find the complaint by ID
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

// --------------------------------------------UPDATE THE COMPLAINT STATUS-------------------------------------------------------------

router.put('/complaint-status/:complaintID', async (req, res) => {
    try {
        const { complaintID } = req.params;

        // Find the complaint to update
        const complaint = await Complaint.findById(complaintID);
        if (!complaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        // Update the complaint status to "accepted"
        const updatedComplaint = await Complaint.findByIdAndUpdate(complaintID, 
            { 
                complaint_status: "accepted",
                updated_at: Date.now() // Update the updated_at field with the current date
            },
            { new: true });

        if (!updatedComplaint) {
            return res.status(404).json({ error: "Complaint not found" });
        }

        res.json(updatedComplaint);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Complaint" });
    }
});


module.exports = router;
