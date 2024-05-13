const express = require("express");
const router = express.Router();
const Delivery = require("../models/delivery");

router.post("/delivery-add", async (req, res) => {
  try {
    const { chargePrice, deliveryFree, interest } = req.body;

    const newDelivery = new Delivery({
      chargePrice,
      deliveryFree,
      interest,
    });

    console.log(newDelivery);

    await newDelivery.save();

    res.json("Delivery Added");
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Error adding delivery" });
  }
});

// READ operation - Get a single delivery by ID
router.get("/delivery/:id", async (req, res) => {
  try {
    const deliveryId = req.params.id;
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ error: "delivery not found" });
    }
    res.json(delivery);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Delivery" });
  }
});

// UPDATE operation - Update a delivery by ID
router.put("/delivery-update/:id", async (req, res) => {
  try {
    const { chargePrice, deliveryFree, interest } = req.body;
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { chargePrice, deliveryFree, interest },
      { new: true }
    );
    res.json(updatedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
