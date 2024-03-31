
const router = require('express').Router()
let RefundSchema = require("../models/RefundSchema");
let orderSchema = require("../models/order_schema");
let ComplaintSchema = require("../models/ComplaintSchema");

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

        const existingOrder = await orderSchema.findById(order_id);
        if(!existingOrder){
            return res.status(400).json({error:"Order ID not found"})
        }

        const existingComplaint = await ComplaintSchema.findById(complaint_id);
        if(!existingComplaint){
            return res.status(400).json({error:"complaint ID not found"})
        }

        // Save refund to the database
        const refund = new RefundSchema({
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
  
          // Find the complaint by id
          const refund = await RefundSchema.findById(id);
  
          if (!refund) {
              return res.status(404).json({ message: 'Refund not found' });
          }
  
          // Update complaint fields
          refund.cus_id = cus_id;
          refund.complaint_id = complaint_id;
          refund.order_id = order_id;
          refund.account_holder = account_holder;
          refund.account_sort_code = account_sort_code;
          refund.account_number = account_number;
          refund.amount = amount;
  
          // Save the updated complaint
          await refund.save();
  
          // Send success response
          res.status(200).json({ message: 'Refund updated', refund });
      } catch (error) {
          // Log the error for debugging
          console.error(error);
          // Send appropriate error response
          res.status(500).json({ message: 'Server error' });
      }
  });

router.get("/quality-refund-read", async (req,res) =>{
    try {
        const refund = await RefundSchema.find().sort({createdAt: -1})
        res.status(200).json(refund)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

});

router.delete("/quality-refund-delete/:id", async (req,res) =>{
  const {id} = req.params;
  RefundSchema.findByIdAndDelete(id)
  .then((complaint) => {
    res.status(200).json({message: 'Refund deleted'})
  })
  .catch((error) => {
    res.status(500).json({message: 'Server Error'})
  })

});

module.exports = router;