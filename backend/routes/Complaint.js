
const router = require('express').Router()
let ComplaintSchema = require("../models/ComplaintSchema");

/*
             IT22107978 => PEIRIS T.C.L
*/


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

router.put("/quality-complaint-update/:id", async (req, res) => {
      const { complaint_type, Order_ID, Resolving_option, Payment_ID, Quantity, Complaint_Status } = req.body;
      const { id } = req.params;
  
      try {
          // Check if required fields are present
          if (!complaint_type || !Order_ID || !Resolving_option || !Payment_ID || !Quantity || !Complaint_Status) {
              return res.status(400).json({ message: 'All fields are required' });
          }
  
  
          //Checking if Quantity is a positive number
          if (Quantity <= 0 || !Number.isInteger(Quantity)) {
              return res.status(400).json({ message: 'Quantity must be a positive integer' });
          }
  
          // Find the complaint by id
          const complaint = await ComplaintSchema.findById(id);
  
          if (!complaint) {
              return res.status(404).json({ message: 'Complaint not found' });
          }
  
          // Update complaint fields
          complaint.complaint_type = complaint_type;
          complaint.Order_ID = Order_ID;
          complaint.Resolving_option = Resolving_option;
          complaint.Payment_ID = Payment_ID;
          complaint.Quantity = Quantity;
          complaint.Complaint_Status = Complaint_Status;
  
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