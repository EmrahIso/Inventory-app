const { Router } = require('express');

const deleteController = require('../controllers/deleteController');
const {
  deletePasswordValidator,
} = require('../validators/deletePasswordValidator');

const { idParamValidator } = require('../validators/idParamValidator');
const validate = require('../middlewares/validate');

const deleteRouter = Router();

deleteRouter.get(
  '/category/:id',
  idParamValidator,
  validate,
  deleteController.getDeleteCategoryForm
);

deleteRouter.post(
  '/category/:id',
  idParamValidator,
  validate,
  deletePasswordValidator,
  deleteController.postDeleteCategoryValidationResults,
  deleteController.postDeleteCategory
);

deleteRouter.get(
  '/item/:id',
  idParamValidator,
  validate,
  deleteController.getDeleteItemForm
);

deleteRouter.post(
  '/item/:id',
  idParamValidator,
  validate,
  deletePasswordValidator,
  deleteController.postDeleteItemValidationResults,
  deleteController.postDeleteItem
);

module.exports = deleteRouter;
