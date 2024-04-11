const express = require("express");
const { register, login, update, deleteUser, signout }  = require('../controllers/customer.register.controller.js');
const { verifyUser } = require("../utils/verify.customer.js");
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.put('/update/:cus_ID', verifyUser,update);
router.delete('/delete/:cus_ID', verifyUser,deleteUser);
router.post('/signout', signout)
module.exports = router;