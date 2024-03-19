/*
    Delivery: By Thanthirige K.S.G.I
*/
const router = require("express").Router();
let Task = require("../models/task_Schema");

//Add Data
router.route("/task-create").post((req,res)=>{
    const Task_status = req.body.Task_status;
    const DriverId = req.body.DriverId;
    // const Delivered_Time = Number(req.body.Delivered_Time);
    // const Delivered_Image = req.body.Delivered_Image;
    // const PickUp_Time = req.body.PickUp_Time;
    // const  PickUp_Image = req.body.PickUp_Image

//Create Object
   const newTask = new Task({
    Task_status,
    DriverId
    // Delivered_Time,
    // Delivered_Image,
    // PickUp_Time,
    // PickUp_Image
   })

   //Pass Object to mongodb
   newTask.save().then(()=>{
    res.json("Task Added")
   }).catch((err)=>{
    console.log(err);
   })
})


//get method(read)
router.route("/task-all-tasks").get((req,res)=>{

    Task.find().then((deliverytaskstatusCRUD)=>{
        res.json(deliverytaskstatusCRUD)
    }).catch((err)=>{
        console.log(err)
    })
})


//Update driver details
router.route("/task-update/:id").put(async (req, res) =>{
    let taskid = req.params.id;
 //destructure
    const{Task_status,DriverId}=req.body

    const updateTask = {
        Task_status,
        DriverId,
  /*    Delivered_Time,
        Delivered_Image,
        PickUp_Time,
        PickUp_Image*/
    }

    const update = await Task.findByIdAndUpdate(taskid,updateTask).then(()=>{
        res.status(200).send({status: "Task Updated!"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error With Update Data",error:err.message});
    })
 
})


//delete
router.route("/task-delete/:id").delete(async(req,res) =>{
    let taskid = req.params.id;

    await Task.findByIdAndDelete(taskid).then(()=>{
        res.status(200).send({status: "Task deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error With Delete Driver" , error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let DriverId = req.params.id;
    const user = await Driver.findById(DriverId).then(()=>{
        res.status(200).send({status: "Driver, fetched",user:user})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error With Get User",error: err.message})
    })
})


module.exports = router;
