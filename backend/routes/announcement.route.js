const express = require('express');
const {
  announcement,
  getannouncement,
  deleteannouncement,
  updateannouncement
} = require('../controllers/announcement.controller.js');
const { verifyToken } = require('../utils/verifyuser.js');

const router = express.Router();

router.post('/announcement', verifyToken, announcement);
router.get('/getannouncement', getannouncement);
router.delete('/deleteannouncement/:announcementId/:userId', verifyToken, deleteannouncement);
router.put('/updateannouncement/:announcementId/:userId', verifyToken, updateannouncement);

module.exports = router;
