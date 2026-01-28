const { query } = require('express-validator');

exports.idQueryValidator = [
  query('category_id')
    .optional()
    .custom((value) => {
      if (value === 'all') return true;
      if (!Number.isInteger(+value) || +value < 1) {
        throw new Error('category_id must be a positive integer or "all"');
      }
      return true;
    })
    .toInt({ if: (value) => value !== 'all' }),
];
