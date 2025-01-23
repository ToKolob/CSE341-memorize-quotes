const { body, validationResult } = require('express-validator')

const quotesValidationRules = () => {
  console.log('quotesValidationRules');
  
  return [
    body('author').isString().notEmpty().withMessage('Author is required and must be a string'),
    body('work').isString().notEmpty().withMessage('Work is required and must be a string'),
    body('theme').isString().notEmpty().withMessage('Theme is required and must be a string'),
    body('quote').isString().notEmpty().withMessage('Quote is required and must be a string'),
    body('year').isInt({ min: -6000, max: 2100 }).withMessage('Year is required and must be a valid integer (e.g., between -6000 and 2100)')
  ]
}

const scripturesValidationRules = () =>{
  console.log('scripturesValidationRules');
    return [
    body('class').isString().notEmpty().withMessage('Class is required'),
    body('book').isString().notEmpty().withMessage('Book is required'),
    body('chapter').notEmpty().withMessage('Chapter is required'),
    body('verse').notEmpty().withMessage('Verse is required'),
    body('text').notEmpty().withMessage('Text is required')
  ]
}


const validate = (req, res, next) => {''
  console.log('validate');
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(412).json({
    errors: extractedErrors,
  })
}


module.exports = {
  scripturesValidationRules,
  quotesValidationRules,
  validate
}