const pool = require('../pool');

async function getAllCategories() {
  // Read
  const res = await pool.query(
    'SELECT * FROM categories ORDER BY created_at DESC;'
  );
  return res.rows;
}

async function getCategoryById({ categoryId }) {
  // Read
  const res = await pool.query('SELECT * FROM categories WHERE id = $1;', [
    categoryId,
  ]);
  return res.rows[0];
}

async function addNewCategory({ name, description }) {
  // Create
  await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2);',
    [name, description]
  );
}

async function deleteCategoryById({ categoryId }) {
  // Delete
  await pool.query('DELETE FROM categories WHERE id = $1;', [categoryId]);
}

async function updateCategoryById({ categoryId, name, description }) {
  // Update
  await pool.query(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3;',
    [name, description, categoryId]
  );
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};
