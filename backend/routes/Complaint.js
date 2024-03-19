const { addComplaint, getComplaint, deleteComplaint } = require('../controllers/Complaints')

const router = require('express').Router()

router.post('/quality-complaint-create',addComplaint)
      .get('/quality-complaint-read',getComplaint)
      .delete('/quality-complaint-delete/:id',deleteComplaint)


module.exports = router