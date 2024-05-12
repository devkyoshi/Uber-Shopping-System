const express = require("express");
const { getEmployees,rateEmployees, getRatings }  = require('../../controllers/customer/customer.rating.controller.js');
const { verifyUser } = require("../../utils/verify.customer.js");
const router = express.Router();
router.get('/getemployees', getEmployees);
router.post('/rateemployees/:emp_ID', verifyUser,rateEmployees);
router.get('/getratings/:emp_ID', verifyUser,getRatings);
module.exports = router;