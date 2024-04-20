const express = require('express');
const { announcement, getannouncement, deleteannouncement, updateannouncement } = require('../controllers/announcement.controller');
const { verifyToken } = require('../utils/verifyuser');
const router = express.Router();

router.post('/announcement', verifyToken, announcement);
router.get('/getannouncement', getannouncement);
router.delete('/deleteannouncement/:announcementId/:userId', verifyToken, deleteannouncement);
router.put('/updateannouncement/:announcementId/:userId', verifyToken, updateannouncement);

module.exports = router;
