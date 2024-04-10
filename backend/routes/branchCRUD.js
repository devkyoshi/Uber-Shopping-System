
// Mathota Arachchi S.S - IT22070876 - branch CRUD

const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
const mongoose = require('mongoose');

// Create a new branch
router.post("/branch-add", async (req, res) => {
    try {
        const { branch_ID, branch_name, branch_Location, district, branch_Latitude, branch_Longitude} = req.body;

        const newBranch = new Branch({
            branch_ID,
            branch_name,
            branch_Location,
            district,
            // branch_Latitude,
            // branch_Longitude
        });

        await newBranch.save();
        res.json("Branch Added");
    } catch (err) {
        console.error(err);
        
        if (err.name === 'ValidationError') {
            const errors = {};
            for (let field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ error: errors });
        }
        
        res.status(500).json({ error: "Error adding branch" });
    }
});

// Update an existing branch
router.put("/branch-update/:branchID", async (req, res) => {
    try {
        const { branchID } = req.params;
    const { branch_ID, branch_name, branch_Location, district, /*branch_Latitude, branch_Longitude*/ } = req.body;

        const updatedBranch = await Branch.findByIdAndUpdate(branchID, {
            branch_ID,
            branch_name,
            branch_Location,
            district,
            // branch_Latitude,
            // branch_Longitude

        }, { new: true });

        if (!updatedBranch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        res.json(updatedBranch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Branch" });
    }
});

// Delete an existing branch
router.delete("/branch-delete/:branchID", async (req, res) => {
    try {
        const { branchID } = req.params;
        const deletedBranch = await Branch.findByIdAndDelete(branchID);

        if (!deletedBranch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        res.json({ message: "Branch deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Branch" });
    }
});

// Read all branch
router.get("/branch-all", async (req, res) => {
    try {
        const branch = await Branch.find();
        res.json(branch);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "An error occurred while fetching Branchs" });
    }
});

// Read a branch by ID
router.get("/branch/:branchID", async (req, res) => {
    try {
        const { branchID } = req.params;
        const branch = await Branch.findById(branchID); 
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }
        res.json(branch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the Branch" });
    }
});

module.exports = router;
