
const router = require('express').Router()
let RefundSchema = require("../models/RefundSchema");

/*
             IT22107978 => PEIRIS T.C.L [Quality Assurance management]
*/


// Create complaint
router.post("/quality-refund-create", async (req, res) => {
    const {
        cus_id,
        complaint_id,
        order_id,
        account_holder,
        account_sort_code,
        account_number,
        amount
    } = req.body;

    try {
        // Check if required fields are present
        if (!cus_id || !complaint_id || !order_id || !account_holder || !account_sort_code || !account_number || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

       
        // Save refund to the database
        const refund = new ComplaintSchema({
            cus_id,
            complaint_id,
            order_id,
            account_holder,
            account_sort_code,
            account_number,
            amount
        });

        await refund.save();
        
        // Send success response
        res.status(200).json({ message: 'Refund recorded', refund });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        // Send appropriate error response
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/quality-refund-update/:id", async (req, res) => {
      const {cus_id, complaint_id, order_id, account_holder, account_sort_code, account_number, amount } = req.body;
      const { id } = req.params;
  
      try {
          // Check if required fields are present
          if (!cus_id || !complaint_id || !order_id || !account_holder || !account_sort_code || !account_number || !amount) {
              return res.status(400).json({ message: 'All fields are required' });
          }
  
  
          //Checking if Quantity is a positive number
          if (quantity <= 0 || !Number.isInteger(quantity)) {
              return res.status(400).json({ message: 'Quantity must be a positive integer' });
          }
  
          // Find the complaint by id
          const complaint = await ComplaintSchema.findById(id);
  
          if (!complaint) {
              return res.status(404).json({ message: 'Complaint not found' });
          }
  
          // Update complaint fields
          complaint.cus_id = cus_id;
          complaint.complaint_type = complaint_type;
          complaint.order_id = order_id;
          complaint.resolving_option = resolving_option;
          complaint.payment_id = payment_id;
          complaint.quantity = quantity;
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

router.get("/quality-refund-read", async (req,res) =>{
    try {
        const complaint = await ComplaintSchema.find().sort({createdAt: -1})
        res.status(200).json(complaint)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

});

router.delete("/quality-refund-delete/:id", async (req,res) =>{
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