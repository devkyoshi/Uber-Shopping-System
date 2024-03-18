/*
    Branch: By Mathota Arachchi S.S
*/

const router = require("express").Router();
let Branch = require("../models/Branch_Schema");

// Create Branch
router.route("/branch-create").post((req, res) =>{
    const Branch_ID = req.body.Branch_ID;
    const Branch_name = req.body.Branch_name;
    const Branch_Location = req.body.Branch_Location;
    const District = req.body.District;
//    const Branch_Latitude = req.body.Branch_Latitude;
//    const Branch_Longtitude = req.body.Branch_Longtitude;

    const newBranch = new Branch({
        Branch_ID,
        Branch_name,
        Branch_Location,
        District,
//      Branch_Latitude,
//      Branch_Longtitude

    })

    newBranch.save().then(() => {
        res.json("Branch Added To the Database")
        }).catch((err) => {
        console.log(err);
    })
})
//Selecting All Branch
router.route("/branch-all-branch").get((req, res) => {
    Branch.find().then((branch) => {
        res.json(branch)
    }).catch((err) => {
        console.log(err)
    })
})

//Update Branch
router.route("/branch-update/:id").put(async (req, res) => {
    let branchID = req.params.id;
//destrcture 
const {Branch_ID, Branch_name, Branch_Location, District, /*Branch_Latitude, Branch_Longtitude */} = req.body;

    const updateBranch = {
        Branch_ID,
        Branch_name, 
        Branch_Location, 
        District,
//      Branch_Latitude,
//      Branch_Longtitude 
     
    }
// await => waiting for promiss
    const update = await Branch.findByIdAndUpdate(branchID, updateBranch)
    .then(() => {
    // another methode => massage pass backend to fortend
    res.status(200).send({status: "Branch Updated!"})
    }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with updating Branch Data! ", error: err.message});
    })
})

router.route("/branch-delete/:id").delete(async (req, res) => {
    let branchID = req.params.id;

// await => waiting for promiss
    await Branch.findByIdAndDelete(branchID).then(() => {
// another methode => massage pass backend to fortend
    res.status(200).send({status: "Branch Removed!"})
    }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error with Deleting Branch!", error: err.message});
    })
})

router.route("/branch-select/:id").get(async (req, res) => {
    let branchID = req.params.id;

   const branch=  await Branch.findById(branchID).then((branch) => {
        res.status(200).send({status: "Branch Details Fetched!", branch})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with retrieving Branch Details", error: err.message});
    })
})

module.exports = router;