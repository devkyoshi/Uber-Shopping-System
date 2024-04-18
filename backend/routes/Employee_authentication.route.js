const express = require('express');
const { register, signin } = require('../controllers/Employee_authentication.controller.js');

const router = express.Router();

router.post('/register', register);
router.post('/signin', signin);

module.exports = router;
