//CRUD test => pass 31.03.24

const express = require("express");
const router = express.Router();
const Branch = require("../models/branch");
const mongoose = require('mongoose');

// Add drivers to a specific branch
router.post("/:branchID/driver-add", async (req, res) => {
    try {
        const { branchID } = req.params;
        const { driver_id, current_handover_money, vehicle_number, availability, driver_longitude, driver_latitude} = req.body;

        const branch = await Branch.findById(branchID);
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        const newDriver = {
            driver_id,
            current_handover_money,
            vehicle_number,
            availability,
            driver_longitude,
            driver_latitude,
        };

        branch.drivers.push(newDriver);
        await branch.save();

        res.json("Driver added to branch");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the driver to the branch" });
    }
});
// Update a driver within a specific branch
router.put("/:branchID/driver-update/:driverID", async (req, res) => {
    try {
        const { branchID, driverID } = req.params;
        const updateData = req.body;

        const branch = await Branch.findById(branchID);
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        const driverIndex = branch.drivers.findIndex(driver => driver.driver_id.toString() === driverID.toString());
        if (driverIndex === -1) {
            return res.status(404).json({ error: "Driver not found in branch" });
        }

        branch.drivers[driverIndex] = { ...branch.drivers[driverIndex], ...updateData };
        await branch.save();

        res.json("Driver updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the driver in the branch" });
    }
});


// Remove a driver from a specific branch
router.delete("/:branchID/driver-delete/:driverID", async (req, res) => {
    try {
        const { branchID, driverID } = req.params;

        const branch = await Branch.findById(branchID);
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        const driverIndex = branch.drivers.findIndex(driver => driver.driver_id.toString() === driverID.toString());
        if (driverIndex === -1) {
            return res.status(404).json({ error: "Driver not found in branch" });
        }

        branch.drivers.splice(driverIndex, 1);
        await branch.save();

        res.json("Driver deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the driver from the branch" });
    }
});


// read all driver from a specific branch
router.get("/:branchID/driver-all", async (req, res) => {
    try {
        const { branchID } = req.params;

        const branch = await Branch.findById(branchID);
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }

        res.json(branch.drivers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching drivers from the branch" });
    }
});


module.exports = router;
