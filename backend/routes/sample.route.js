const express = require('express');
const router = express.Router();
const SampleController = require('../controllers/sample.controller')

router.get('/:sampleId', SampleController.getSampleData)

module.exports = router;