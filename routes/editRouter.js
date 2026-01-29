const { Router } = require('express');
const editController = require('../controllers/editController');

const {
  editCategoryValidator,
} = require('../validators/editCategoryValidator');
const { editItemValidator } = require('../validators/editItemValidator');

const { idParamValidator } = require('../validators/idParamValidator');
const validate = require('../middlewares/validate');

const editRouter = Router();

editRouter.get(
  '/category/:id',
  idParamValidator,
  validate,
  editController.getEditCategoryForm
);

editRouter.get(
  '/item/:id',
  idParamValidator,
  validate,
  editController.getEditItemForm
);

editRouter.post(
  '/category/:id',
  idParamValidator,
  validate,
  editCategoryValidator,
  editController.postEditCategoryValidationResults,
  editController.postEditCategory
);

editRouter.post(
  '/item/:id',
  idParamValidator,
  validate,
  editItemValidator,
  editController.postEditItemValidationResults,
  editController.postEditItem
);

module.exports = editRouter;
