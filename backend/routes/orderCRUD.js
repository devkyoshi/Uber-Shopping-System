/*
    Order: By Perera.G.W.R.S
*/

const router = require('express').Router();
const Order = require('../models/order_schema');

// View all orders
router.route('/').get((req, res) => {
  Order.find()
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Create a new order
router.route('/add').post((req, res) => {
  // Parse request body
  const {
    totalAmount,
    delivery_Charges,
    delivery_Distance,
    Order_status,
    Delivery_DateTime,
    Additional_Notes,
    quantity,
    Cus_ID,
    payID
  } = req.body;

  // Create a new order instance
  const newOrder = new Order({
    totalAmount,
    delivery_Charges, 
    delivery_Distance,
    Order_status,
    Delivery_DateTime,
    Additional_Notes, 
    quantity,
    Cus_ID,
    payID
  });

  // Save the new order
  newOrder.save()
    .then(() => res.json('Order added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a single order by ID
router.route('/get/:id').get(async (req, res) => {
  const order_ID = req.params.id;
  try {
    const order = await Order.findById(order_ID);
    if (!order) {
      res.status(404).send({ status: "Order not found" });
      return;
    }
    res.status(200).send({ status: "Order fetched!", order });
  } catch (error) {
    res.status(500).send({ status: "Error fetching order" });
  }
});

// Delete an order by ID within allowed time period
router.route('/delete/:id').delete(async (req, res) => {
  const order_ID = req.params.id;
  try {
    const order = await Order.findById(order_ID);
    if (!order) {
      res.status(404).send({ status: "Order not found" });
      return;
    }

    // Check if deletion is within allowed time period (e.g., 30 minutes)
    const deletionTime = new Date(order.Delivery_DateTime.getTime() + (30 * 60000)); // possible to delete within 30 min
    const currentTime = new Date();
    if (currentTime < deletionTime) {
      res.status(403).send({ status: "Forbidden", message: "Deletion time period has expired" });
      return;
    }

    // Perform order deletion
    await Order.findByIdAndDelete(order_ID);
    res.status(200).send({ status: "Order deleted!" });
  } catch (error) {
    res.status(500).send({ status: "Error with deleting order!" });
  }
});

// Update an order by ID within allowed time period
router.route('/update/:id').put(async (req, res) => {
  const order_ID = req.params.id;
  const { Delivery_DateTime, quantity, Additional_Notes } = req.body;

  try {
    const order = await Order.findById(order_ID);
    if (!order) {
      res.status(404).send({ status: "Order not found" });
      return;
    }

    // Check if update is within allowed time period (e.g., 1 hour)
    const updateTime = new Date(order.Delivery_DateTime.getTime() + (60 * 60000)); // possible to change whithin 1 hour
    const currentTime = new Date();
    if (currentTime < updateTime) {
      res.status(403).send({ status: "Forbidden", message: "Update time period has expired" });
      return;
    }

    // Update order fields
    const updateOrder = {
      Delivery_DateTime,
      quantity,
      Additional_Notes
    };

    await Order.findByIdAndUpdate(order_ID, updateOrder);
    res.status(200).send({ status: "Order updated!" });
  } catch (error) {
    res.status(500).send({ status: "Error with updating order!" });
  }
});

module.exports = router;
