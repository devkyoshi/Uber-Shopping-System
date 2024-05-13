const express = require('express');
const { lvlupdateUser, getUsers, test, updateUser, deleteUser, signout } = require('../controllers/user.controller');
const { verifyToken } = require('../utils/verifyuser');
const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.put('/lvlupdate/:userId', verifyToken, lvlupdateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);


router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);

module.exports = router;
