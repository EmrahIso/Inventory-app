const { body } = require('express-validator');

exports.addItemValidator = [
  body('item-name')
    .trim()
    .notEmpty()
    .withMessage('Item name is required')
    .isLength({ min: 1, max: 20 })
    .withMessage('Item name must be between 1 and 20 characters'),
  body('item-brand')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Brand must be less than 20 characters'),
  body('item-price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('item-stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer')
    .toInt(),
  body('item-description')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Description must be less than 50 characters'),
];
