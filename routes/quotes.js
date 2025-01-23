const express = require('express');
const router = express.Router();

const controller = require('../controllers/quotes.js');
const { quotesValidationRules, validate } = require('../middleware/validate.js');

router.get('/', controller.getQuote);
router.get('/:id', controller.getQuoteById);
router.post('/', quotesValidationRules(), validate, controller.postQuote);
router.put('/:id', quotesValidationRules(), validate, controller.putQuote);
router.delete('/:id', controller.deleteQuote);

module.exports = router;