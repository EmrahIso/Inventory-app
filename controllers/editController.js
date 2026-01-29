const {
  getCategoryById,
  updateCategoryById,
} = require('../db/queries/categoryQueries');
const { getItemById, updateItemById } = require('../db/queries/itemQueries');

const { validationResult } = require('express-validator');

exports.getEditCategoryForm = async (req, res) => {
  const { id } = req.params;

  const category = await getCategoryById({ categoryId: id });

  res.render('edit-category', {
    title: `Edit Category`,
    category,
    errors: null,
  });
};

exports.getEditItemForm = async (req, res) => {
  const { id } = req.params;

  const item = await getItemById({ itemId: id });

  res.render('edit-item', {
    title: `Edit Item - ${item.name}`,
    item,
    errors: null,
  });
};

exports.postEditCategory = async (req, res) => {
  const { id } = req.params;

  await updateCategoryById({
    categoryId: id,
    name: req.body['category-name'],
    description: req.body['category-description'],
  });

  res.redirect('/');
};

exports.postEditCategoryValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('edit-category', {
      title: 'Edit Category',
      errors: errors.array(),
      category: {
        id: req.params.id,
        name: req.body['category-name'],
        description: req.body['category-description'],
      },
    });
  }
  next();
};

exports.postEditItem = async (req, res) => {
  const { id } = req.params;

  await updateItemById({
    itemId: id,
    name: req.body['item-name'],
    brand: req.body['item-brand'],
    price: req.body['item-price'],
    stock: req.body['item-stock'],
    description: req.body['item-description'],
  });

  res.redirect('/');
};

exports.postEditItemValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('edit-item', {
      title: 'Edit Item',
      errors: errors.array(),
      item: {
        id: req.params.id,
        name: req.body['item-name'],
        brand: req.body['item-brand'],
        price: req.body['item-price'],
        stock: req.body['item-stock'],
        description: req.body['item-description'],
      },
    });
  }
  next();
};
