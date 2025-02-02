const express = require('express');
const router = express.Router();

const controller = require('../controllers/scriptures.js');
const { validate, scripturesValidationRules } = require('../middleware/validate.js');
const { isAutehnticated } = require('../middleware/authenticate.js');

router.get('/', controller.getScripture);
router.get('/:id', controller.getScriptureById);
router.post('/', isAutehnticated, scripturesValidationRules(), validate, controller.postScripture);
router.put('/:id', isAutehnticated, scripturesValidationRules(), validate, controller.putScripture);
router.delete('/:id', isAutehnticated, controller.deleteScripture);

module.exports = router;