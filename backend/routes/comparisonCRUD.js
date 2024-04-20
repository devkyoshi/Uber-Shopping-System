/**
   Perera.G.W.R.S
 */

const express = require("express");
const router = express.Router();
const Comparison = require('../models/comparison');
const mongoose = require('mongoose');

// View all comparisons
router.route('/').get((req, res) => {
  Comparison.find()
    .then(comparisons => res.json(comparisons))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add new comparison
router.route('/add').post((req, res) => {
  // Parse request body
  const {
    SM_Name,
    price,
    quantity
  } = req.body;

  // Create a new comparison instance
  const newComparison = new Comparison({
    SM_Name,
    price,
    quantity
  });

  // Save the new comparison
  newComparison.save()
    .then(() => res.json('Comparison Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a single Comparion by ID
router.route('/get/:id').get(async (req, res) => {
  const SM_ID = req.params.id;
  try {
    const comparison = await Comparison.findById(SM_ID);
    if (!comparison) {
      res.status(404).send({ status: "Order not found" });
      return;
    }
    res.status(200).send({ status: "Order fetched!", comparison });
  } catch (error) {
    res.status(500).send({ status: "Error fetching order" });
  }
});

// Delete an Comparison by ID - maybe not gonna need -
router.route('/delete/:id').delete(async (req, res) => {
  const SM_ID = req.params.id; 
  try {
    const comparison = await Comparison.findById(SM_ID); 
    if (!comparison) {
      res.status(404).send({ status: "Comparison not found!" });
      return;
    }

    // Perform Comparison deletion
    await Comparison.findByIdAndDelete(SM_ID); 
    res.status(200).send({ status: "Comparison Deleted!" });
  } catch (error) {
    res.status(500).send({ status: "Error with deletingComparison!" });
  }
});

// Update a comparison by ID
router.route('/update/:id').put(async (req, res) => {
  const SM_ID = req.params.id; 
  const { SM_Name, price, quantity } = req.body;

  try {
    const comparison = await Comparison.findById(SM_ID); 
    if (!comparison) {
      res.status(404).send({ status: "Comparison not found!" });
      return;
    }

    // Update comparison fields
    const updateComparison = {
      SM_Name,
      price,
      quantity
    };

    await Comparison.findByIdAndUpdate(SM_ID, updateComparison); 
    res.status(200).send({ status: "Comparison updated!" });
  } catch (error) {
    res.status(500).send({ status: "Error with updating Comparison!" });
  }
});

module.exports = router;
