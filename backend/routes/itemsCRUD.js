//CRUD test => pass 31.03.24

const express = require("express");
const router = express.Router();
const Supermarket = require("../models/supermarkets");

// Add items to a specific supermarket
router.post("/:supermarketId/item-add", async (req, res) => {
  try {
    const { supermarketId } = req.params;
    const {
      item_type,
      item_name,
      price,
      available_quantity,
      description,
      item_img,
    } = req.body;

    const supermarket = await Supermarket.findById(supermarketId);
    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    // Create new item
    const newItem = {
      item_type,
      item_name,
      price,
      available_quantity,
      description,
      item_img,
    };

    // Add item to the supermarket's items array
    supermarket.items.push(newItem);

    // Save the updated supermarket document
    await supermarket.save();

    res.json("Item added to supermarket");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding the item to the supermarket",
    });
  }
});

// Update an item within a specific supermarket
router.put("/:supermarketId/item-update/:itemId", async (req, res) => {
  try {
    const { supermarketId, itemId } = req.params;
    const { item_type, item_name, price, available_quantity, description } =
      req.body;

    const supermarket = await Supermarket.findById(supermarketId);
    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    // Find the index of the item within the items array
    const itemIndex = supermarket.items.findIndex((item) => item._id == itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in supermarket" });
    }

    // Update item properties
    const updatedItem = supermarket.items[itemIndex];
    updatedItem.item_type = item_type;
    updatedItem.item_name = item_name;
    updatedItem.price = price;
    updatedItem.available_quantity = available_quantity;
    updatedItem.description = description;

    // Save the updated supermarket document
    await supermarket.save();

    res.json("Item updated in supermarket");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the item in the supermarket",
    });
  }
});

// Remove an item from a specific supermarket
router.delete("/:supermarketId/item-delete/:itemId", async (req, res) => {
  try {
    const { supermarketId, itemId } = req.params;

    const supermarket = await Supermarket.findById(supermarketId);
    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    // Find the index of the item within the items array
    const itemIndex = supermarket.items.findIndex((item) => item._id == itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in supermarket" });
    }

    // Remove the item from the items array
    supermarket.items.splice(itemIndex, 1);

    // Save the updated supermarket document
    await supermarket.save();

    res.json("Item removed from supermarket");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while removing the item from the supermarket",
    });
  }
});

// Get all items from a specific supermarket
router.get("/:supermarketId/items", async (req, res) => {
  try {
    const { supermarketId } = req.params;

    // Find the supermarket by ID
    const supermarket = await Supermarket.findById(supermarketId);

    if (!supermarket) {
      return res.status(404).json({ error: "Supermarket not found" });
    }

    const ItemDetails = supermarket.items;

    // Return the items array of the supermarket
    res.json(ItemDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching items from the supermarket",
    });
  }
});

module.exports = router;
