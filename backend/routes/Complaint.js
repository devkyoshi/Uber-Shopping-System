
const router = require('express').Router()
let ComplaintSchema = require("../models/ComplaintSchema");
let orderSchema = require("../models/order_schema");

/*
             IT22107978 => PEIRIS T.C.L [Quality Assurance management]
*/

/**
 "driver_id":"DA1010",
        "market_name":"Keells",
        "district":"colombo",
        "branch":"Rathmalana",
        "issue_type":"gvuhhijads",
        "description":"dtfytfyng"
 */

// Create complaint
router.post("/quality-complaint-create", async (req, res) => {
    const {
        cus_id,
        complaint_type,
        order_id,
        resolving_option,
        payment_id,
        quantity,
        complaint_status
    } = req.body;

    try {
        
        // Check if required fields are present
        if (!cus_id || !complaint_type || !order_id || !resolving_option || !payment_id || !quantity || !complaint_status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // checking if Quantity is a positive number
        if (quantity <= 0 || !Number.isInteger(quantity)) {
            return res.status(400).json({ message: 'Quantity must be a positive integer' });
        }

        //Check whether order id exists
        const existingOrder = await orderSchema.findById(order_id);
        if(!existingOrder){
            return res.status(400).json({error:"Order ID not found"})
        }

        // Save complaint to the database
        const complaint = new ComplaintSchema({
            cus_id,
            complaint_type,
            order_id,
            resolving_option,
            payment_id,
            quantity,
            complaint_status
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

router.put("/quality-complaint-update/:id", async (req, res) => {
      const { complaint_status } = req.body;
      const { id } = req.params;
  
      try {
          // Check if required field is present
          if (!complaint_status) {
              return res.status(400).json({ message: 'All fields are required' });
          }
  
          // Find the complaint by id
          const complaint = await ComplaintSchema.findById(id);
  
          if (!complaint) {
              return res.status(404).json({ message: 'Complaint not found' });
          }
  
          // Update complaint fields
          complaint.complaint_status = complaint_status;
  
          // Save the updated complaint
          await complaint.save();
  
          // Send success response
          res.status(200).json({ message: 'Complaint updated', complaint });
      } catch (error) {
          // Log the error for debugging
          console.error(error);
          // Send appropriate error response
          res.status(500).json({ message: 'Server error' });
      }
  });

router.get("/quality-complaint-read", async (req,res) =>{
    try {
        const complaint = await ComplaintSchema.find().sort({createdAt: -1})
        res.status(200).json(complaint)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

});

router.delete("/quality-complaint-delete/:id", async (req,res) =>{
  const {id} = req.params;
  ComplaintSchema.findByIdAndDelete(id)
  .then((complaint) => {
    res.status(200).json({message: 'Complaint deleted'})
  })
  .catch((error) => {
    res.status(500).json({message: 'Server Error'})
  })

});

module.exports = router;