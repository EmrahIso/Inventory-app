const { body } = require('express-validator');

const SECRET_PASSWORD = process.env.SECRET_PASSWORD;

exports.editCategoryValidator = [
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
  body('admin-password')
    .trim()
    .notEmpty()
    .withMessage('Admin password is required')
    .custom((value) => {
      if (value !== SECRET_PASSWORD) {
        throw new Error('Invalid admin password');
      }
      return true;
    }),
];
