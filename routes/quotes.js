const express = require('express');
const router = express.Router();

const controller = require('../controllers/quotes.js');
const { validate } = require('../middleware/validate.js');

router.get('/', controller.getQuote);
router.get('/:id', controller.getQuoteById);
router.post('/', validate, controller.postQuote);
router.put('/:id', validate, controller.putQuote);
router.delete('/:id', controller.deleteQuote);

module.exports = router;