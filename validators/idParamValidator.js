const { param } = require('express-validator');

exports.idParamValidator = [
  param('id')
    .exists()
    .withMessage('ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .toInt(),
];
