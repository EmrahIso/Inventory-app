const { body } = require('express-validator');

const SECRET_PASSWORD = process.env.SECRET_PASSWORD;

const deletePasswordValidator = body('admin-password')
  .trim()
  .notEmpty()
  .withMessage('Admin password is required')
  .custom((value) => {
    if (value !== SECRET_PASSWORD) {
      throw new Error('Invalid admin password');
    }
    return true;
  });

module.exports = { deletePasswordValidator };
