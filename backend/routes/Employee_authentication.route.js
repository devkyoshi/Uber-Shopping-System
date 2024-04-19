const express = require('express');
const { register, signin } = require('../controllers/Employee_authentication.controller');
const router = express.Router();

router.post('/register', register);
// router.get('/salary/:userId', getSalaryAndBenefits);
// router.post('/updateSalaryAndBenefits', updateSalaryAndBenefits);
router.post('/signin', signin);
// router.post('/google', google);

module.exports = router;
