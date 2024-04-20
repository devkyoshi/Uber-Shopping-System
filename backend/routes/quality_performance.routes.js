
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const pdf = require('html-pdf');
const Order = require('../models/order');
const Complaint = require('../models/complaint')


router.get('/quality-generate',async (req, res) => {
    try {
      const { month, year } = req.query;

      // Parse the year to ensure it's a number
      const yearNumber = parseInt(year);

      // Calculate the start and end dates of the selected month
      const startDate = new Date(year, month - 1, 1); // month is 0-indexed in JavaScript Date
      const endDate = new Date(year, month, 0); // Last day of the selected month

      // Retrieve complaints within the selected month
      const doneComplaints = await Complaint.find({ 'complaint_status': 'accepted', 'created_at': { $gte: startDate, $lte: endDate } });
      const complaints = await Complaint.find({ 'created_at': { $gte: startDate, $lte: endDate } });

      // Retrieve orders within the selected month
      const doneorders = await Order.find({ 'order_status': 'Picked', 'order_date': { $gte: startDate, $lte: endDate } });
      const orders = await Order.find({ 'order_date': { $gte: startDate, $lte: endDate } });

      // Retrieve cash payments within the selected month
      const cashPayments = await Order.distinct('cash_payment', { 'cash_payment.paid_time': { $gte: startDate, $lte: endDate } });
      const doneCashPayments = await Order.find({ 'cash_payment.payment_status': 'Paid', 'cash_payment.paid_time': { $gte: startDate, $lte: endDate } });

      // Retrieve card payments within the selected month
      const cardPayments = await Order.distinct('card_payment', { 'card_payment.paid_time': { $gte: startDate, $lte: endDate } });
      const doneCardPayments = await Order.find({ 'card_payment.payment_status': 'Paid', 'card_payment.paid_time': { $gte: startDate, $lte: endDate } });
    
       // Calculate the total number profit related data
        const totalOrders = orders.length;
        const totalDoneOrders = doneorders.length;
        const totalDoneCashPayments = doneCashPayments.length;
        const totalCashPayments = cashPayments.length;
        const totalDoneCardPayments = doneCardPayments.length;
        const totalCardPayments = cardPayments.length;

        // Calculate the total number of customer service related data
        const totalComplaints = complaints.length;
        const totalDoneComplaints = doneComplaints.length;
    
        // Calculate profit percentages
        const orderPercentage = totalDoneOrders > 0 ? ((totalDoneOrders / totalOrders) * 100).toFixed(2) : 0;
        const cashPaymentPercentage = totalDoneCashPayments > 0 ? ((totalDoneCashPayments / totalOrders) * 100).toFixed(2) : 0;
        const cardPaymentPercentage = totalDoneCardPayments > 0 ? ((totalDoneCardPayments / totalOrders) * 100).toFixed(2) : 0;
        
        // Calculate customer service percentages
        const complaintPercentage = totalDoneComplaints > 0 ? ((totalDoneComplaints / totalComplaints) * 100).toFixed(2) :0;

        // Extract the month name from the selected date using toLocaleString()
        const monthName = startDate.toLocaleString('en-US', { month: 'long' });

        // Create HTML for the report title
        const reportTitle = `<h1>Performance Report - ${monthName} ${yearNumber.toString()}</h1>`;
    
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
        pdf.create(reportTitle + reportHtml).toStream((err, stream) => {
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