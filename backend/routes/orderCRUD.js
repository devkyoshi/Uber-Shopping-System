//CRUD tested
/**
   Perera.G.W.R.S
 */

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const Supermarket = require("../models/supermarkets");

//Create new order
router.post("/create-order", async (req, res) => {
  try {
    const { customer_id, cart, purchase_amount } = req.body; // Extract customer_id and cart from request body

    // Create a new order object with customer_id and cart details
    const newOrder = new Order({
      customer_id,
      purchase_amount,
      items: cart, // Assign cart details to items field in the order
      // You can add additional fields here if needed
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order object
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
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
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Order" });
  }
});

// Read a Order by ID
router.get("/details/:OrderID", async (req, res) => {
  try {
    const { OrderID } = req.params;

    // Find the order
    const order = await Order.findById(OrderID);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Initialize an array to store details for each item in the order
    const itemsDetails = [];

    // Iterate over each item in the order
    for (const orderItem of order.items) {
      const item_Id = orderItem.item_id;

      // Find the supermarket containing the item
      const supermarket = await Supermarket.findOne({ "items._id": item_Id });
      if (!supermarket) {
        return res
          .status(404)
          .json({ error: "Supermarket not found for item" });
      }

      // Find the specific item within the supermarket
      const item = supermarket.items.find(
        (item) => item._id.toString() === item_Id.toString()
      );
      if (!item) {
        return res
          .status(404)
          .json({ error: "Item not found in the supermarket" });
      }

      // Push relevant item details along with quantity to itemsDetails array
      itemsDetails.push({
        item_name: item.item_name,
        price: item.price,
        sm_name: supermarket.sm_name,
        quantity: orderItem.quantity,
      });
    }

    // Send response with order details and details for each item
    res.json({
      order_details: {
        order_id: order._id,
        customer_id: order.customer_id,
        purchase_amount: order.purchase_amount,
        order_district: order.order_district,
        total_amount: order.total_amount,
        order_status: order.order_status,
        order_date: order.order_date,
        additional_notes: order.additional_notes,
        delivery: order.delivery,
        cash_payment: order.cash_payment,
        card_payment: order.card_payment,
      },
      items: itemsDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update order - additional notes
router.put("/update/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { additionalNotes } = req.body;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update additional notes
    order.additional_notes = additionalNotes;

    // Save the updated order
    await order.save();

    res
      .status(200)
      .json({ message: "Additional notes updated successfully", order: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add delivery details to order
router.post("/add-delivery/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { distance, costPerkm } = req.body;
    const charges = distance * costPerkm;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.delivery.push({ charges, distance, costPerkm });

    await order.save();

    res.json("Delivery details added to the order successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding details to the order" });
  }
});

// Update delivery details to order
router.put("/:orderId/update-delivery/:deliveryId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deliveryId = req.params.deliveryId;
    const { distance, costPerkm } = req.body;
    const charges = distance * costPerkm;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deliver = order.delivery.id(deliveryId);
    if (!deliver) {
      return res.status(404).json({ error: "Delivery not found in the order" });
    }

    deliver.distance = distance;
    deliver.costPerkm = costPerkm;
    deliver.charges = charges;

    await order.save();

    res.json("Delivery details updated in the order successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating Delivery details in the order",
    });
  }
});

// Read a delivery detail by ID
router.get("/:orderId/read_delivery", async (req, res) => {
  try {
    const { orderId, deliveryId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deliveryDetail = order.delivery.id(deliveryId);
    if (!deliveryDetail) {
      return res
        .status(404)
        .json({ error: "Delivery detail not found in the order" });
    }

    res.json(deliveryDetail);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the delivery detail" });
  }
});

// Read all delivery details for an order
router.get("/order/:orderId/delivery-details", async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deliveryDetails = order.delivery;
    if (!deliveryDetails || deliveryDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No delivery details found for the order" });
    }

    res.json(deliveryDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching delivery details" });
  }
});

// Create a new Order
router.post("/order-add", async (req, res) => {
  try {
    const {
      customer_id,
      purchase_amount,
      total_amount,
      order_status,
      additional_notes,
    } = req.body;

    const newOrder = new Order({
      customer_id,
      purchase_amount,
      total_amount,
      order_status,
      additional_notes,
    });

    await newOrder.save();
    res.json("Order Added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the Order" });
  }
});

// Route to get the latest order ID of a certain customer
router.get("/latest-order/:customer_id", async (req, res) => {
  try {
    const customerId = req.params.customer_id;

    // Find the latest order for the specified customer
    const latestOrder = await Order.findOne({ customer_id: customerId })
      .sort({ order_date: -1 }) // Sort in descending order of order_date to get the latest order first
      .select("_id"); // Select only the _id field of the order

    if (!latestOrder) {
      return res
        .status(404)
        .json({ message: "No orders found for the customer" });
    }

    // Return the latest order ID
    res.json({ latest_order_id: latestOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all orders of a certain customer
router.get("/customer/:customerId/orders", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Find all orders associated with the customer ID
    const orders = await Order.find({ customer_id: customerId });

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
