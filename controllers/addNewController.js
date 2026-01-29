const { validationResult } = require('express-validator');
const { addNewCategory } = require('../db/queries/categoryQueries');
const { addNewItem } = require('../db/queries/itemQueries');

exports.getNewCategoryForm = (req, res) => {
  res.render('add-category', {
    title: 'Add New Category',
    errors: null,
    data: null,
  });
};

exports.getNewItemForm = (req, res) => {
  res.render('add-item', {
    title: 'Add New Item',
    errors: null,
    data: null,
    category_id: req.query.category_id,
  });
};

exports.postNewCategory = async (req, res) => {
  // Logic to handle adding a new category

  await addNewCategory({
    name: req.body['category-name'],
    description: req.body['category-description'],
  });

  res.redirect('/');
};

exports.postNewCategoryValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('add-category', {
      title: 'Add New Category',
      errors: errors.array(),
      data: req.body,
    });
  }
  next();
};

exports.postNewItem = async (req, res) => {
  const category_id = req.query['category_id'];

  // Logic to handle adding a new item
  await addNewItem({
    name: req.body['item-name'],
    brand: req.body['item-brand'],
    price: req.body['item-price'],
    stock: req.body['item-stock'],
    description: req.body['item-description'],
    category_id: category_id,
  });

  res.redirect('/');
};

exports.postNewItemValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('add-item', {
      title: 'Add New Item',
      errors: errors.array(),
      data: req.body,
      category_id: req.query.category_id,
    });
  }
  next();
};
