/*
    Driver: By Thanthirige K.S.G.I
*/
const router = require("express").Router();
let Driver = require("../models/driver_Schema");

//Add Data
router.route("/driver-create").post((req,res)=>{
    // const Driver_Longtitude = req.body.Driver_Longtitude;
    // const Driver_Latitude = req.body.Driver_Latitude;
    const current_handover_money = Number(req.body.current_handover_money);
    const current_Location = req.body.current_Location;
    const Branch_ID = req.body.Branch_ID;
    const  availability = req.body.availability;

//Create Object
   const newDriver = new Driver({
    // Driver_Longtitude,
    // Driver_Latitude,
    current_handover_money,
    current_Location,
    Branch_ID,
    availability
   })

   //Pass Object to mongodb
   newDriver.save().then(()=>{
    res.json("Driver Added")
   }).catch((err)=>{
    console.log(err);
   })
})


//get method(read)
router.route("/driver-all-drivers").get((req,res)=>{

    Driver.find().then((drivers)=>{
        res.json(drivers)
    }).catch((err)=>{
        console.log(err)
    })
})


//Update driver details
router.route("/driver-update/:id").put(async (req, res) =>{
    let DriverId = req.params.id;
 //destructure
    const{Driver_Longtitude,Driver_Latitude,current_handover_money,current_Location,Branch_ID,availability}=req.body

    const updateDriver = {
        Driver_Longtitude,
        Driver_Latitude,
        current_handover_money,
        current_Location,
        Branch_ID,
        availability
    }

    const update = await Driver.findByIdAndUpdate(DriverId,updateDriver).then(()=>{
        res.status(200).send({status: "Driver Updated!" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error With Update Data",error:err.message});
    })
 
})


//delete
router.route("/driver-delete/:id").delete(async(req,res) =>{
    let DriverId = req.params.id;

    await Driver.findByIdAndDelete(DriverId).then(()=>{
        res.status(200).send({status: "Driver deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error With Delete Driver" , error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let DriverId = req.params.id;
    const user = await Driver.findById(DriverId).then(()=>{
        res.status(200).send({status: "Driver fetched",user:user})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error With Get User",error: err.message})
    })
})


module.exports = router;
