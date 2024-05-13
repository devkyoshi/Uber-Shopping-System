//CRUD Tested

const express = require("express");
const router = express.Router();
const Supermarket = require("../models/supermarkets");
const mongoose = require("mongoose");

// Create a new supermarket
router.post("/supermarket-add", async (req, res) => {
  try {
    const { sm_name, sm_location, sm_latitude, sm_longitude } = req.body;

    const newSupermarket = new Supermarket({
      sm_name,
      sm_location,
      sm_latitude,
      sm_longitude,
    });

    await newSupermarket.save();
    res.json("Supermarket Added");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the Supermarket" });
  }
});

// Update an existing supermarket
router.put("/supermarket-update/:supermarketId", async (req, res) => {
  try {
    const { supermarketId } = req.params;
    const { sm_name, sm_location, sm_latitude, sm_longitude, items } = req.body;

    const updatedSupermarket = await Supermarket.findByIdAndUpdate(
      supermarketId,
      {
        sm_name,
        sm_location,
        sm_latitude,
        sm_longitude,
      },
      { new: true }
    );

    if (!updatedSupermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    res.json(updatedSupermarket);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the Supermarket" });
  }
});

// Delete an existing supermarket
router.delete("/supermarket-delete/:supermarketId", async (req, res) => {
  try {
    const { supermarketId } = req.params;
    const deletedSupermarket = await Supermarket.findByIdAndDelete(
      supermarketId
    );

    if (!deletedSupermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    res.json({ message: "Supermarket deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Supermarket" });
  }
});

// Read all supermarkets
router.get("/supermarkets", async (req, res) => {
  try {
    const supermarkets = await Supermarket.find();
    res.json(supermarkets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching supermarkets" });
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
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Supermarket" });
  }
});

router.get("/grouped-items/:item_type", async (req, res) => {
  try {
    const { item_type } = req.params;

    const allSupermarkets = await Supermarket.find().populate("items");

    // Create a map to group items by item_type and item_name
    const groupedItems = new Map();

    // Iterate through each supermarket
    allSupermarkets.forEach((supermarket) => {
      // Iterate through each item in the supermarket
      supermarket.items.forEach((item) => {
        // Check if the item's item_type matches the requested item_type
        if (item.item_type === item_type) {
          // Generate a unique key combining item_type and item_name
          const key = `${item.item_type}_${item.item_name}`;
          // Check if the key already exists in the map
          if (!groupedItems.has(key)) {
            // If the key does not exist, initialize the key with item_name, description, and item_img
            groupedItems.set(key, {
              item_name: item.item_name,
              description: item.description,
              item_img: item.item_img,
              items: [],
            });
          }
          // Push the item details (price, item_id, sm_name) to the array under the key
          groupedItems.get(key).items.push({
            price: item.price,
            item_id: item._id,
            sm_name: supermarket.sm_name,
          });
        }
      });
    });

    // Convert map values to array
    const itemGrouped = Array.from(groupedItems.values());

    res.json(itemGrouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get item details from item id
router.get("/items/:item_Id", async (req, res) => {
  try {
    const { item_Id } = req.params;

    // Find the item in any supermarket which contains the given item
    const supermarket = await Supermarket.findOne({ "items._id": item_Id });

    if (!supermarket) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Find the specific item within the supermarket
    const item = supermarket.items.find(
      (item) => item._id.toString() === item_Id
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Send response with item details and supermarket name
    res.json({
      sm_name: supermarket.sm_name,
      item,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------------Peiris T C L add the code---------------------using for the Report issue form

// Route to fetch supermarket locations by name
router.get('/supermarket/locations/:name', async (req, res) => {
  const supermarketName = req.params.name;
  console.log(supermarketName)
  try {
    // Query the database to find the supermarket by name
    const supermarket = await Supermarket.findOne({ sm_name: supermarketName }).select('sm_location');

    if (!supermarket) {
      return res.status(404).json({ error: 'Supermarket not found' });
    }

    console.log(supermarket)
    res.json({ locations: supermarket.sm_location });
  } catch (error) {
    console.error('Error fetching supermarket locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
