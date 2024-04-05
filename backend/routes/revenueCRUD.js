const express = require('express');
const router = express.Router();
const Revenue = require('../models/revenue');
const Order = require('../models/order');

// Calculate daily revenue
router.get('/calculate-daily-revenue', async (req, res) => {
    try {
        const date = new Date(); // Use current date
        const startOfDay = new Date(date.setHours(0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59));

        const orders = await Order.find({
            'payment.paid_time': {
                $gte: startOfDay,
                $lt: endOfDay
            },
            'payment.payment_status': 'success'
        });

        const totalRevenue = orders.reduce((total, order) => total + order.payment.payment_amount, 0);

        let dailyRevenue = await Revenue.findOne({ date });

        if (!dailyRevenue) {
            dailyRevenue = new Revenue({ date });
        }

        dailyRevenue.total_revenue = totalRevenue;
        dailyRevenue.orders = orders.map(order => ({
            order_id: order._id,
            payment_amount: order.payment.payment_amount
        }));

        await dailyRevenue.save();

        res.status(200).json({ message: `Total revenue for ${date.toDateString()} (successful payments only): ${totalRevenue}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error calculating daily revenue' });
    }
});

// Fetch total revenue for a specific date
router.get('/fetch-revenue-by-date', async (req, res) => {
    try {
        const { date } = req.query; // Extract date from query parameters

        if (!date) {
            return res.status(400).json({ error: 'Date parameter is required' });
        }

        const selectedDate = new Date(date);
        const dailyRevenue = await Revenue.findOne({ date: selectedDate });

        if (!dailyRevenue) {
            return res.status(404).json({ error: 'No revenue record found for the specified date' });
        }

        res.status(200).json({ message: `Total revenue for ${selectedDate.toDateString()}: ${dailyRevenue.total_revenue}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching revenue by date' });
    }
});

module.exports = router;
