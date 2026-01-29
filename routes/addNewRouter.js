const { Router } = require('express');

const { idQueryValidator } = require('../validators/idQueryValidator');
const validate = require('../middlewares/validate');

const addNewController = require('../controllers/addNewController');

const { addCategoryValidator } = require('../validators/addCategoryValidator');
const { addItemValidator } = require('../validators/addItemValidator');

const addNewRouter = Router();

addNewRouter.get('/category', addNewController.getNewCategoryForm);

addNewRouter.get(
  '/item',
  idQueryValidator,
  validate,
  addNewController.getNewItemForm
);

addNewRouter.post(
  '/category',
  addCategoryValidator,
  addNewController.postNewCategoryValidationResults,
  addNewController.postNewCategory
);

addNewRouter.post(
  '/item',
  idQueryValidator,
  validate,
  addItemValidator,
  addNewController.postNewItemValidationResults,
  addNewController.postNewItem
);

module.exports = addNewRouter;
