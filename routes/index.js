const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/', (req, res) => {
  res.send('Hello, world!');
});
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/quotes', require('./quotes.js'));

module.exports = router;