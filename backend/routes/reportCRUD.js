
const router = require('express').Router()
let ReportSchema = require("../models/report");
let userSchema = require("../models/user.model")

/*
             IT22107978 => PEIRIS T.C.L [Quality Assurance management]
*/


// Create complaint
router.post("/quality-report-add", async (req, res) => {
    const {
        driver_id,
        market_name,
        sm_location,
        item_name,
        issue_type,
        description
    } = req.body;

    try {
        // Check if required fields are present
        if (!driver_id || !market_name || !sm_location || !item_name ||  !issue_type || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingemp = await userSchema.findById(driver_id);
  
          if (!existingemp) {
              return res.status(404).json({ message: 'User not found' });
          }

    
        // Save refund to the database
        const report = new ReportSchema({
            driver_id,
            market_name,
            sm_location,
            item_name,
            issue_type,
            description
        });

        await report.save();
        
        // Send success response
        res.json({ message: "Issue Reported" });
       // res.status(200).json({ message: 'Issue Reported', report });
    } catch (error) {
        // Log the error for debugging
        console.error(error);
        // Send appropriate error response
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/quality-report-update/:id", async (req, res) => {
      const {driver_id, market_name, sm_location,sm_latitude, sm_longitude, item_name, issue_type, description } = req.body;
      const { id } = req.params;
  
      try {
          // Check if required fields are present
          if (!driver_id || !market_name || !sm_location || !sm_latitude || !sm_longitude || !item_name || !issue_type || !description) {
              return res.status(400).json({ message: 'All fields are required' });
          }
  
          // Find the complaint by id
          const report = await ReportSchema.findById(id);
  
          if (!report) {
              return res.status(404).json({ message: 'Refund not found' });
          }
  
          // Update complaint fields
          report.driver_id = driver_id;
          report.market_name = market_name;
          report.sm_location = sm_location;
          report.sm_latitude = sm_latitude;
          report.sm_longitude = sm_longitude;
          report.item_name = item_name;
          report.issue_type = issue_type;
          report.description = description;
         
          // Save the updated complaint
          await report.save();
  
          // Send success response
          res.status(200).json({ message: 'Report updated', report });
      } catch (error) {
          // Log the error for debugging
          console.error(error);
          // Send appropriate error response
          res.status(500).json({ message: 'Server error' });
      }
  });

router.get("/quality-report-read", async (req,res) =>{
    try {
        const report = await ReportSchema.find().sort({createdAt: -1})
        res.status(200).json(report)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

});

router.delete("/quality-report-delete/:id", async (req,res) =>{
  const {id} = req.params;
  ReportSchema.findByIdAndDelete(id)
  .then((report) => {
    res.status(200).json({message: 'Report deleted'})
  })
  .catch((error) => {
    res.status(500).json({message: 'Server Error'})
  })

});

module.exports = router;