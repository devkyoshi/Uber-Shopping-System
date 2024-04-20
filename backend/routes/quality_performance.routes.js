
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pdf = require('html-pdf');
const Order = require('../models/order');
const Complaint = require('../models/complaint')


router.get('/quality-generate',async (req, res) => {
    try {
        const { month, year } = req.query; // Assuming month and year are provided as query parameters

        // Calculate the start and end dates of the selected month
        const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JavaScript Date
        const endDate = new Date(year, month, 0); // Last day of the selected month

        const doneComplaints = await Complaint.find({'complaint_status':'accepted'});
        const complaints = await Complaint.find();

        // Fetch orders with orderStatus as 'Picked'
        const doneorders = await Order.find({ order_status: 'Picked' });
        const orders = await Order.find();

        // Fetch orders with cash payment status as 'Paid'
        const cashPayments = await Order.distinct('cash_payment');
        const doneCashPayments = await Order.find({ 'cash_payment.payment_status': 'Paid' });
    
        // Fetch orders with card payment status as 'Paid'
        const cardPayments = await Order.distinct('card_payment');
        const doneCardPayments = await Order.find({ 'card_payment.payment_status': 'Paid' });
    
        // Calculate the total number of orders, cash payments, and card payments
        const totalOrders = orders.length;
        const totalDoneOrders = doneorders.length;
        const totalDoneCashPayments = doneCashPayments.length;
        const totalCashPayments = cashPayments.length;
        const totalDoneCardPayments = doneCardPayments.length;
        const totalCardPayments = cardPayments.length;

        const totalComplaints = complaints.length;
        const totalDoneComplaints = doneComplaints.length;
    
        // Calculate payment percentages
        const orderPercentage = totalDoneOrders > 0 ? ((totalDoneOrders / totalOrders) * 100).toFixed(2) : 0;
        const cashPaymentPercentage = totalDoneCashPayments > 0 ? ((totalDoneCashPayments / totalOrders) * 100).toFixed(2) : 0;
        const cardPaymentPercentage = totalDoneCardPayments > 0 ? ((totalDoneCardPayments / totalOrders) * 100).toFixed(2) : 0;

        const complaintPercentage = totalDoneComplaints > 0 ? ((totalDoneComplaints / totalComplaints) * 100).toFixed(2) :0;
    
        // Create HTML for the report
        const reportHtml = generateReportHtml(
          orders,
          totalOrders, 
          totalDoneOrders, 
          orderPercentage,
          cashPayments, 
          totalCashPayments, 
          totalDoneCashPayments,
          cashPaymentPercentage, 
          cardPayments, 
          totalCardPayments, 
          totalDoneCardPayments,
          cardPaymentPercentage,
          complaintPercentage,
          totalDoneComplaints,
          totalComplaints
        );
    
        // Convert HTML to PDF and send to client
        pdf.create(reportHtml).toStream((err, stream) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=performance_report.pdf'
          });
          stream.pipe(res);
        });
      } catch (err) {
        res.status(500).send(err);
      }
    });
    
    // Function to generate HTML for the report
    const generateReportHtml = ( 
          orders,
          totalOrders, 
          totalDoneOrders, 
          orderPercentage,
          cashPayments, 
          totalCashPayments, 
          totalDoneCashPayments,
          cashPaymentPercentage, 
          cardPayments, 
          totalCardPayments, 
          totalDoneCardPayments,
          cardPaymentPercentage,
          complaintPercentage,
          totalDoneComplaints,
          totalComplaints
    ) => {
      let html = '<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;} th {background-color: #f2f2f2;}</style>';
      html += '<h1>Performance Report</h1>';

      html += '<p>Profit Peformance</p>';
      html += '<table>';
      html += '<tr><th>Category</th><th>Percentage</th><th>Total</th><th>Total done</th></tr>';
      html += `<tr><td>Order handling</td><td  style="background-color: ${getColorForPercentage(orderPercentage)}">${orderPercentage}%</td><td>${totalOrders}</td><td>${totalDoneOrders}</td></tr>`;
      html += `<tr><td>Cash Payment handling</td><td  style="background-color: ${getColorForPercentage(cashPaymentPercentage)}">${cashPaymentPercentage}%</td><td>${totalCashPayments}</td><td>${totalDoneCashPayments}</td></tr>`;
      html += `<tr><td>Card Payment handling</td><td  style="background-color: ${getColorForPercentage(cardPaymentPercentage)}">${cardPaymentPercentage}%</td><td>${totalCardPayments}</td><td>${totalDoneCardPayments}</td></tr>`;
      html += '</table>';

      html += '<p>Customer Service Peformance</p>';
      html += '<table>';
      html += '<tr><th>Category</th><th>Percentage</th><th>Total</th><th>Total done</th></tr>';
      html += `<tr><td>Complaint handling</td><td  style="background-color: ${getColorForPercentage(complaintPercentage)}">${complaintPercentage}%</td><td>${totalComplaints}</td><td>${totalDoneComplaints}</td></tr>`;
      html += '</table>';
    
      return html;
    };

    // Function to determine the color for the percentage based on its range
    const getColorForPercentage = (percentage) => {
      if (percentage >= 75) {
        return 'green';
      } else if (percentage >= 50) {
        return 'yellow';
      } else if (percentage >= 25) {
        return 'orange';
      } else {
        return 'red';
      }
    };


module.exports = router;