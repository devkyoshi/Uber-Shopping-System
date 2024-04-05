//CRUD Tested

const express = require("express");
const router = express.Router();
const Supermarket = require("../models/supermarkets");
const mongoose = require('mongoose');

// Create a new supermarket
router.post("/supermarket-add", async (req, res) => {
    try {
        const { sm_name, sm_location, sm_latitude, sm_longitude } = req.body;

        const newSupermarket = new Supermarket({
            sm_name,
            sm_location,
            sm_latitude,
            sm_longitude
        });

        await newSupermarket.save();
        res.json("Supermarket Added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the Supermarket" });
    }
});

// Update an existing supermarket
router.put("/supermarket-update/:supermarketId", async (req, res) => {
    try {
        const { supermarketId } = req.params;
        const { sm_name, sm_location, sm_latitude, sm_longitude, items } = req.body;

        const updatedSupermarket = await Supermarket.findByIdAndUpdate(supermarketId, {
            sm_name,
            sm_location,
            sm_latitude,
            sm_longitude
        }, { new: true });

        if (!updatedSupermarket) {
            return res.status(404).json({ error: "Supermarket not found" });
        }

        res.json(updatedSupermarket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Supermarket" });
    }
});

// Delete an existing supermarket
router.delete("/supermarket-delete/:supermarketId", async (req, res) => {
    try {
        const { supermarketId } = req.params;
        const deletedSupermarket = await Supermarket.findByIdAndDelete(supermarketId);

        if (!deletedSupermarket) {
            return res.status(404).json({ error: "Supermarket not found" });
        }

        res.json({ message: "Supermarket deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Supermarket" });
    }
});

// Read all supermarkets
router.get("/supermarkets", async (req, res) => {
    try {
        const supermarkets = await Supermarket.find();
        res.json(supermarkets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching supermarkets" });
    }
});

// Read a supermarket by ID
router.get("/supermarket/:supermarketId", async (req, res) => {
    try {
        const { supermarketId } = req.params;
        const supermarket = await Supermarket.findById(supermarketId);
        if (!supermarket) {
            return res.status(404).json({ error: "Supermarket not found" });
        }
        res.json(supermarket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the Supermarket" });
    }
});

module.exports = router;