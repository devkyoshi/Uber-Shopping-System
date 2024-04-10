const express = require('express');
const { test, updateUser, deleteUser, signout } = require('../controllers/user.controller.js');
const { verifyToken } = require('../utils/verifyuser.js');
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

module.exports = router;
