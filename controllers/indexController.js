const {
  getAllCategories,
  getCategoryById,
} = require('../db/queries/categoryQueries');
const {
  getAllItemsByCategoryId,
  getItemById,
} = require('../db/queries/itemQueries');

exports.getIndex = async (req, res) => {
  const categories = await getAllCategories();
  const { category_id } = req.query;

  const queryParams = req.query;

  if (category_id && category_id !== 'all') {
    // Fetch items for the specified category
    const category = await getCategoryById({
      categoryId: category_id,
    });

    const items = await getAllItemsByCategoryId({
      categoryId: category_id,
    });

    category.items = items;

    return res.render('index', {
      title: 'Home',
      categories,
      data: [category],
      queryParams,
    });
  } else {
    // Fetch all items for all categories
    for (const category of categories) {
      const items = await getAllItemsByCategoryId({
        categoryId: category.id,
      });
      category.items = items;
    }

    res.render('index', {
      title: 'Home',
      categories,
      data: categories,
      queryParams,
    });
  }
};

exports.getCategoryDetails = async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryById({ categoryId: id });
  const items = await getAllItemsByCategoryId({ categoryId: id });
  category.items = items;

  res.render('category-details', {
    title: `${category.name} Details`,
    category,
  });
};

exports.getItemDetails = async (req, res) => {
  const { id } = req.params;
  const item = await getItemById({ itemId: id });

  res.render('item-details', {
    title: `${item.name} Details`,
    item,
  });
};
