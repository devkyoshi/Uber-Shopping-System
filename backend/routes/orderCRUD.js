//CRUD tested
/**
   Perera.G.W.R.S
 */

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const Supermarket = require("../models/supermarkets");
const DeliveryData = require("../models/delivery");
const Customer = require("../models/customer/customer_register_schema");

//Create new order
router.post("/create-order", async (req, res) => {
  try {
    const { customer_id, cart, purchase_amount } = req.body;

    // Create a new order object with customer_id and cart details
    const newOrder = new Order({
      customer_id,
      purchase_amount,
      items: cart,
    });

    // Find delivery settings
    const deliverySetting = await DeliveryData.findOne();
    if (!deliverySetting) {
      return res.status(404).json({ error: "Delivery settings not found" });
    }

    // Calculate total quantity of items in the cart
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });

    // Calculate delivery charges
    let chargesDelivery = 0;
    if (totalQuantity < deliverySetting.deliveryFree) {
      chargesDelivery = deliverySetting.chargePrice;
    } else {
      chargesDelivery =
        deliverySetting.chargePrice +
        deliverySetting.chargePrice * deliverySetting.interest;
    }

    // Add delivery details to the order
    newOrder.delivery.push({ charges: chargesDelivery, distance: 0 });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    // Respond with the saved order object
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update order - additional notes
router.put("/update/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { additionalNotes, totalAmount } = req.body;

  try {
    // Find the order by its ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update additional notes
    order.additional_notes = additionalNotes;
    order.total_amount = totalAmount;

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

// Route to get all orders for a certain customer
// router.get("/orders/:customerId", async (req, res) => {
//   const customerId = req.params.customerId;

//   try {
//     // Fetch customer details
//     const customer = await Customer.findById(customerId);

//     if (!customer) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     // Fetch orders for the customer
//     const orders = await Order.find({ customer_id: customerId });

//     res.json({ customer, orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/orders/:customerId", async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const orders = await Order.find({ customer_id: customerId });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching Orders" });
  }
});

module.exports = router;
