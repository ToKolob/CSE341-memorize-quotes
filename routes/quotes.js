const express = require('express');
const router = express.Router();

const controller = require('../controllers/quotes.js');
const { quotesValidationRules, validate } = require('../middleware/validate.js');
const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getQuote);
router.get('/:id', controller.getQuoteById);
router.post('/', isAutehnticated, quotesValidationRules(), validate, controller.postQuote);
router.put('/:id', isAutehnticated, quotesValidationRules(), validate, controller.putQuote);
router.delete('/:id', isAutehnticated, controller.deleteQuote);

module.exports = router;