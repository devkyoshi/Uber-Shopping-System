
const router = require('express').Router()
let ComplaintSchema = require("../models/ComplaintSchema");

// Create complaint
router.post("/quality-complaint-create", async (req, res) => {
    const {
        complaint_type,
        Order_ID,
        Resolving_option,
        Payment_ID,
        Quantity,
        Complaint_Status
    } = req.body;

    try {
        // Check if required fields are present
        if (!complaint_type || !Order_ID || !Resolving_option || !Payment_ID || !Quantity || !Complaint_Status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // checking if Quantity is a positive number
        
        if (Quantity <= 0 || !Number.isInteger(Quantity)) {
            return res.status(400).json({ message: 'Quantity must be a positive integer' });
        }

        // Save complaint to the database
        const complaint = new ComplaintSchema({
            complaint_type,
            Order_ID,
            Resolving_option,
            Payment_ID,
            Quantity,
            Complaint_Status
        });

        await complaint.save();
        
        // Send success response
        res.status(200).json({ message: 'Complaint added', complaint });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        // Send appropriate error response
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;