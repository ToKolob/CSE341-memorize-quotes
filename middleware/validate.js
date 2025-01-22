const { body, validationResult } = require('express-validator');

const validate = [
  body('class').isString().notEmpty().withMessage('Class is required'),
  body('book').isString().notEmpty().withMessage('Book is required'),
  body('chapter').notEmpty().withMessage('Chapter is required'),
  body('verse').notEmpty().withMessage('Verse is required'),
  body('text').notEmpty().withMessage('Text is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
      errors: extractedErrors,
    });
  }
];

module.exports = {
  validate,
};