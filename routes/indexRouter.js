const { Router } = require('express');

const indexController = require('../controllers/indexController');

const { idQueryValidator } = require('../validators/idQueryValidator');
const { idParamValidator } = require('../validators/idParamValidator');

const validate = require('../middlewares/validate');

const indexRouter = Router();

indexRouter.get('/', idQueryValidator, validate, indexController.getIndex);

indexRouter.get(
  '/category/:id',
  idParamValidator,
  validate,
  indexController.getCategoryDetails
);

indexRouter.get(
  '/item/:id',
  idParamValidator,
  validate,
  indexController.getItemDetails
);

module.exports = indexRouter;
