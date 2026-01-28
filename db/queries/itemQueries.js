const pool = require('../pool');

async function getAllItemsByCategoryId({ categoryId }) {
  // Read
  const res = await pool.query(
    'SELECT * FROM items WHERE category_id = $1 ORDER BY created_at DESC;',
    [categoryId]
  );
  return res.rows;
}

async function getItemById({ itemId }) {
  // Read
  const res = await pool.query('SELECT * FROM items WHERE id = $1;', [itemId]);
  return res.rows[0];
}

async function addNewItem({
  name,
  brand,
  price,
  stock,
  description,
  category_id,
}) {
  // Create
  await pool.query(
    'INSERT INTO items (name, brand, price, stock, description, category_id) VALUES ($1, $2, $3, $4, $5, $6);',
    [name, brand, price, stock, description, category_id]
  );
}

async function deleteAllItemsFromCategoryById({ categoryId }) {
  // Delete
  await pool.query('DELETE FROM items WHERE category_id = $1;', [categoryId]);
}

async function deleteItemById({ itemId }) {
  // Delete
  await pool.query('DELETE FROM items WHERE id = $1;', [itemId]);
}

async function updateItemById({
  itemId,
  name,
  brand,
  price,
  stock,
  description,
}) {
  // Update
  await pool.query(
    'UPDATE items SET name = $1, brand = $2, price = $3, stock = $4, description = $5 WHERE id = $6;',
    [name, brand, price, stock, description, itemId]
  );
}

module.exports = {
  getAllItemsByCategoryId,
  getItemById,
  addNewItem,
  deleteAllItemsFromCategoryById,
  deleteItemById,
  updateItemById,
};
