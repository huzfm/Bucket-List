const express = require('express')
const form_controller = require('../controllers/form_controller');
const router = express.Router();
router.post('/add', form_controller.destination)
module.exports = router