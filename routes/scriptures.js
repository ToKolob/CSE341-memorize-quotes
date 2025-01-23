const express = require('express');
const router = express.Router();

const controller = require('../controllers/scriptures.js');
const { validate, scripturesValidationRules } = require('../middleware/validate.js');

router.get('/', controller.getScripture);
router.get('/:id', controller.getScriptureById);
router.post('/', scripturesValidationRules(), validate, controller.postScripture);
router.put('/:id', scripturesValidationRules(), validate, controller.putScripture);
router.delete('/:id', controller.deleteScripture);

module.exports = router;