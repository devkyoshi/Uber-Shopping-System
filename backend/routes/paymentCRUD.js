//CRUD Tested
//Created by Prasad H.G.A.T (IT22056870)

const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Revenue = require("../models/revenue");

// Add payment details for a certain order document(cash)
router.post("/pay-cash/:orderId/add-payment", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const { email, address, postal_code, district, nearest_town } = req.body;
    const payment_amount = order.purchase_amount;
    const paymentId = new ObjectId(); // Generate new ObjectId for payment

    // Update the order document with the provided payment details and district
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        order_district: district,
        cash_payment: {
          _id: paymentId,
          payment_method: "cash",
          email,
          payment_amount,
          address,
          postal_code,
          paid_time: new Date(),
          payment_status: "Pending",
          district,
          nearest_town,
        },
      },
    });

    // Update the revenue
    let revenue = await Revenue.findOne();
    if (!revenue) {
      revenue = new Revenue({
        total_revenue: payment_amount,
        payments: [{ _id: paymentId, time_stamp: Date.now() }],
      });
    } else {
      // Add the payment amount to the existing total revenue
      revenue.total_revenue += payment_amount;
      // Record payment details
      revenue.payments.push({ _id: paymentId, time_stamp: Date.now() });
    }
    await revenue.save();

    // Send success response
    res
      .status(200)
      .json({ message: "Payment details added to the order successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding payment details to the order",
    });
  }
});

// Update payment details for a certain order document(cash)
router.put("/pay-cash/:orderId/update-payment/:paymentId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const paymentId = req.params.paymentId;

    const {
      email,
      payment_amount,
      address,
      postal_code,
      district,
      nearest_town,
    } = req.body;

    const payment_status = "Paid (Updated)";

    // Update the payment details within the order document
    await Order.findOneAndUpdate(
      { _id: orderId, "cash_payment._id": paymentId },
      {
        $set: {
          "cash_payment.email": email,
          "cash_payment.payment_amount": payment_amount,
          "cash_payment.address": address,
          "cash_payment.postal_code": postal_code,
          "cash_payment.payment_status": payment_status,
          "cash_payment.updated_time": new Date(),
          "cash_payment.district": district,
          "cash_payment.nearest_town": nearest_town,
          order_district: district, // Update order_district field
        },
      }
    );

    res.json("Payment details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating payment details",
    });
  }
});

router.delete(
  "/pay-cash/:orderId/delete-payment/:paymentId",
  async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const paymentId = req.params.paymentId;

      // Delete the payment details from the order document
      await Order.findOneAndUpdate(
        { _id: orderId },
        { $unset: { cash_payment: paymentId } }
      );

      // Find the order
      const order = await Order.findById(orderId);
      if (!order) {
        console.log("Order Not Found");
      }
      const RemovepaymentAmount = order.purchase_amount;

      const revenue = await Revenue.findOne();
      if (!revenue) {
        return res.status(404).json({ error: "Revenue document not found" });
      }

      revenue.total_revenue -= RemovepaymentAmount;

      // Find the index of the payment in the payments array
      const paymentIndex = revenue.payments.findIndex(
        (payment) => payment._id.toString() === paymentId
      );

      if (paymentIndex === -1) {
        return res.status(404).json({ error: "Payment record not found" });
      }
      revenue.payments.splice(paymentIndex, 1);
      await revenue.save();
      // Send success response
      res.status(200).json({ message: "Payment record removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while deleting payment details",
      });
    }
  }
);

// Add payment details to a certain order document(card)
router.post("/pay-card/:orderId/add-payment", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const {
      email,
      account_number,
      exp,
      cvc,
      account_holder,
      district,
      nearest_town,
    } = req.body;

    const payment_amount = order.purchase_amount;
    const paymentId = new ObjectId(); // Generate new ObjectId for payment

    // Update the order document with the provided payment details and district
    await Order.findByIdAndUpdate(orderId, {
      card_payment: {
        _id: paymentId,
        payment_method: "card",
        email,
        account_number,
        exp,
        cvc,
        account_holder,
        payment_amount,
        paid_time: new Date(),
        payment_status: "Paid",
        district,
        nearest_town,
      },
      order_district: district, // Update order_district field
    });

    // Update the revenue
    let revenue = await Revenue.findOne();
    if (!revenue) {
      revenue = new Revenue({
        total_revenue: payment_amount,
        payments: [{ _id: paymentId, time_stamp: Date.now() }],
      });
    } else {
      // Add the payment amount to the existing total revenue
      revenue.total_revenue += payment_amount;
      // Record payment details
      revenue.payments.push({ _id: paymentId, time_stamp: Date.now() });
    }
    await revenue.save();

    res.json("Card payment details added to the order successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while adding card payment details to the order",
    });
  }
});

// Update payment details for a certain order document(card)
router.put("/pay-card/:orderId/update-payment/:paymentId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const paymentId = req.params.paymentId;

    const {
      email,
      account_number,
      exp,
      cvc,
      account_holder,
      payment_amount,
      district,
      nearest_town,
    } = req.body;
    const payment_status = "Pending(Updated)";

    // Update the payment details within the order document
    await Order.findOneAndUpdate(
      { _id: orderId, "card_payment._id": paymentId },
      {
        $set: {
          "card_payment.email": email,
          "card_payment.account_number": account_number,
          "card_payment.exp": exp,
          "card_payment.cvc": cvc,
          "card_payment.account_holder": account_holder,
          "card_payment.payment_amount": payment_amount,
          "card_payment.payment_status": payment_status,
          "card_payment.updated_time": new Date(),
          "card_payment.district": district,
          "card_payment.nearest_town": nearest_town,
          order_district: district, // Update order_district field
        },
      }
    );

    res.json("Card payment details updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating card payment details",
    });
  }
});

// Delete payment details from a certain order document(card)
router.delete(
  "/pay-card/:orderId/delete-payment/:paymentId",
  async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const paymentId = req.params.paymentId;

      // Delete the payment details from the order document
      await Order.findOneAndUpdate(
        { _id: orderId },
        { $unset: { card_payment: paymentId } }
      );

      // Find the order
      const order = await Order.findById(orderId);
      if (!order) {
        console.log("Order Not Found");
      }
      const RemovepaymentAmount = order.purchase_amount;

      const revenue = await Revenue.findOne();
      if (!revenue) {
        return res.status(404).json({ error: "Revenue document not found" });
      }

      revenue.total_revenue -= RemovepaymentAmount;

      const paymentIndex = revenue.payments.findIndex(
        (payment) => payment._id.toString() === paymentId
      );

      if (paymentIndex === -1) {
        return res.status(404).json({ error: "Payment record not found" });
      }

      revenue.payments.splice(paymentIndex, 1);
      await revenue.save();

      res.json("Card payment details deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while deleting card payment details",
      });
    }
  }
);

router.get("/payments", async (req, res) => {
  try {
    // Query the database to find all orders
    const orders = await Order.find().select("_id cash_payment card_payment");

    // Filter orders with either card_payment or cash_payment
    const filteredOrders = orders.filter(
      (order) => order.card_payment || order.cash_payment
    );

    // If no orders with payment information found, send empty response
    if (filteredOrders.length === 0) {
      return res.json([]);
    }

    // Extract payment details from each order
    const payments = filteredOrders.map((order) => {
      let payment_id,
        payment_method,
        email,
        payment_status,
        paid_time,
        nearest_town,
        district,
        updated_time,
        payment_amount;

      if (order.card_payment) {
        payment_id = order.card_payment._id;
        payment_method = order.card_payment.payment_method;
        payment_status = order.card_payment.payment_status;
        email = order.card_payment.email;
        paid_time = order.card_payment.paid_time;
        district = order.card_payment.district;
        payment_amount = order.card_payment.payment_amount;
        nearest_town = order.card_payment.nearest_town;
        if (order.card_payment.updated_time) {
          updated_time = order.card_payment.updated_time;
        } else {
          updated_time = "Not Updated";
        }
      } else if (order.cash_payment) {
        payment_id = order.cash_payment._id;
        payment_method = order.cash_payment.payment_method;
        email = order.cash_payment.email;
        payment_amount = order.cash_payment.payment_amount;
        district = order.cash_payment.district;
        payment_status = order.cash_payment.payment_status;
        paid_time = order.cash_payment.paid_time;
        if (order.cash_payment.updated_time) {
          updated_time = order.cash_payment.updated_time;
        } else {
          updated_time = "Not Updated";
        }
        nearest_town = order.cash_payment.nearest_town;
      }

      // Construct the payment object
      const paymentObj = {
        payment_id,
        payment_amount,
        payment_method,
        payment_status,
        nearest_town,
        district,
        paid_time,
        email,
        updated_time,
      };

      // Conditionally include order_id if payment exists
      if (payment_id) {
        paymentObj.order_id = order._id;
      }

      return paymentObj;
    });

    // Send the payments as a response
    res.json(payments);
    console.log("Data Passed From DB");
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to read payments for a specific order ID
router.get("/payment/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch the order first
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Extract payment details from the order
    const cashPayment = order.cash_payment;
    const cardPayment = order.card_payment;
    const totalAmount = order.purchase_amount;

    res.json({ cashPayment, cardPayment, totalAmount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payments" });
  }
});

// Route method to get all cash payments for a certain customer
router.get("/cash/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const cashPayments = await Order.find({
      customer_id: customerId,
      cash_payment: { $exists: true },
    }).select("_id cash_payment");
    res.json(cashPayments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cash payments" });
  }
});

// Route method to get all card payments for a certain customer
router.get("/card/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    const cardPayments = await Order.find({
      customer_id: customerId,
      card_payment: { $exists: true },
    }).select("_id card_payment");
    res.json(cardPayments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving card payments" });
  }
});

// Route to get payment statistics
router.get("/payment-stats", async (req, res) => {
  try {
    const totalCardPayments = await Order.countDocuments({
      "card_payment.payment_method": "card",
    });
    const totalCashPayments = await Order.countDocuments({
      "cash_payment.payment_method": "cash",
    });

    const totalCardAmount = await Order.aggregate([
      { $match: { "card_payment.payment_method": "card" } },
      {
        $group: { _id: null, total: { $sum: "$card_payment.payment_amount" } },
      },
    ]);
    const totalCashAmount = await Order.aggregate([
      { $match: { "cash_payment.payment_method": "cash" } },
      {
        $group: { _id: null, total: { $sum: "$cash_payment.payment_amount" } },
      },
    ]);

    const paymentPerDay = await Order.aggregate([
      {
        $project: {
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$card_payment.paid_time",
            },
          },
          amount: "$card_payment.payment_amount",
        },
      },
      { $group: { _id: "$day", total: { $sum: "$amount" } } },
    ]);

    const allPayments = await Order.find(
      {
        $or: [
          { "card_payment.payment_amount": { $exists: true } },
          { "cash_payment.payment_amount": { $exists: true } },
        ],
      },
      {
        "card_payment.paid_time": 1,
        "card_payment.payment_method": 1,
        "card_payment.payment_amount": 1,
        "cash_payment.paid_time": 1,
        "cash_payment.payment_method": 1,
        "cash_payment.payment_amount": 1,
      }
    ).lean();

    const paymentsWithTimestamp = allPayments.map((order) => {
      let timestamp = null;
      let paymentMethod = null;
      let amount = null;

      if (order.card_payment && order.card_payment.paid_time) {
        timestamp = order.card_payment.paid_time;
        paymentMethod = order.card_payment.payment_method;
        amount = order.card_payment.payment_amount;
      } else if (order.cash_payment && order.cash_payment.paid_time) {
        timestamp = order.cash_payment.paid_time;
        paymentMethod = order.cash_payment.payment_method;
        amount = order.cash_payment.payment_amount;
      }

      return { timestamp, paymentMethod, amount };
    });

    res.json({
      totalCardPayments,
      totalCashPayments,
      totalCardAmount: totalCardAmount[0]?.total || 0,
      totalCashAmount: totalCashAmount[0]?.total || 0,
      paymentPerDay,
      paymentsWithTimestamp,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
