//CRUD tested
/**
   Perera.G.W.R.S
 */

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require('mongoose');

// Create a new Order
router.post("/order-add", async (req, res) => {
    try {
        const { customer_id, purchase_amount, total_amount, order_status, additional_notes, delivery:{charges,distance}} = req.body;

        const newOrder = new Order({
            customer_id,
            purchase_amount,
            total_amount,
            order_status,
            additional_notes,
            delivery:{
                charges,
                distance
            }
        });

        await newOrder.save();
        res.json("Order Added");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding the Order" });
    }
});

//Add Items to the order
router.post("/order/:orderId/add-item", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { item_id, quantity } = req.body;

        // Find the order document by its ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Push the new item to the items array
        order.items.push({ item_id, quantity });

        // Save the updated order document
        await order.save();

        // Send response
        res.json("Item added to the order successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while adding item to the order" });
    }
});

// Update item quantity in the order
router.put("/order/:orderId/update-item/:itemId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const itemId = req.params.itemId;
        const { quantity } = req.body;

        // Find the order document by its ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Find the item in the items array and update its quantity
        const item = order.items.find(item => item.item_id.toString() === itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found in the order" });
        }
        item.quantity = quantity;

        // Save the updated order document
        await order.save();

        // Send response
        res.json("Item quantity updated in the order successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating item quantity in the order" });
    }
});


// Remove item from the order
router.delete("/order/:orderId/remove-item/:itemId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const itemId = req.params.itemId;

        // Find the order document by its ID
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Find the index of the item to remove
        const itemIndex = order.items.findIndex(item => item.item_id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ error: "Item not found in the order" });
        }

        // Remove the item from the items array
        order.items.splice(itemIndex, 1);

        // Save the updated order document
        await order.save();

        // Send response
        res.json("Item removed from the order successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while removing item from the order" });
    }
});



// Update an existing Order
router.put("/order-update/:orderID", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { customer_id, purchase_amount, total_amount, order_status, additional_notes, delivery:{charges,distance}} = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderID, {
            customer_id,
            purchase_amount,
            total_amount,
            order_status,
            additional_notes,
            delivery:{
                charges,
                distance,
            }
        }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the Order" });
    }
});

// Delete an existing Orders
router.delete("/order-delete/:orderID", async (req, res) => {
    try {
        const { orderID } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(orderID);

        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the Order" });
    }
});

// Read all Orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching Orders" });
    }
});

// Read a Order by ID
router.get("/order/:OrderID", async (req, res) => {
    try {
        const { OrderID } = req.params;
        const order = await Order.findById(OrderID);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the Order" });
    }
});

module.exports = router;