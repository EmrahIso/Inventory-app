const { body } = require('express-validator');

exports.addCategoryValidator = [
  body('category-name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('Category name must be between 1 and 20 characters'),
  body('category-description')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Description must be less than 50 characters'),
];
