const {
  getCategoryById,
  deleteCategoryById,
} = require('../db/queries/categoryQueries');
const {
  getItemById,
  deleteAllItemsFromCategoryById,
  deleteItemById,
} = require('../db/queries/itemQueries');

const { validationResult } = require('express-validator');

exports.getDeleteCategoryForm = async (req, res) => {
  const category = await getCategoryById({ categoryId: req.params.id });
  res.render('delete-category-confirm', {
    title: 'Delete Category',
    categoryId: req.params.id,
    category,
  });
};

exports.getDeleteItemForm = async (req, res) => {
  const item = await getItemById({ itemId: req.params.id });

  res.render('delete-item-confirm', {
    title: 'Delete Item',
    itemId: req.params.id,
    item,
  });
};

exports.postDeleteCategory = async (req, res) => {
  // Logic to handle deleting a category
  const categoryId = req.params.id;

  await deleteCategoryById({ categoryId });

  await deleteAllItemsFromCategoryById({ categoryId });

  res.redirect('/');
};

exports.postDeleteCategoryValidationResults = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const category = await getCategoryById({ categoryId: req.params.id });

    return res.status(400).render('delete-category-confirm', {
      title: 'Delete Category',
      error: errors.array()[0].msg,
      category: category,
    });
  }
  next();
};

exports.postDeleteItem = async (req, res) => {
  // Logic to handle deleting an item
  const itemId = req.params.id;

  await deleteItemById({ itemId });

  res.redirect('/');
};

exports.postDeleteItemValidationResults = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const item = await getItemById({ itemId: req.params.id });

    return res.status(400).render('delete-item-confirm', {
      title: 'Delete Item',
      error: errors.array()[0].msg,
      item: item,
    });
  }
  next();
};
