const { Client } = require('pg');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const INIT_SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL CHECK (stock >= 0),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  category_id INTEGER,
  CONSTRAINT fk_category
    FOREIGN KEY(category_id)
    REFERENCES categories(id)
    ON DELETE SET NULL
);
`;

const SQL_DEFAULT_DATA = `
INSERT INTO categories (name, description) VALUES
  ('Laptops', 'Portable computing devices'),
  ('Monitors', 'External display screens'),
  ('Keyboards', 'Text input devices'),
  ('Mice', 'Pointing input devices'),
  ('Components', 'Internal PC components')
ON CONFLICT (name) DO NOTHING;

INSERT INTO items (name, brand, price, stock, description, category_id) VALUES
('MacBook Pro 14 M2', 'Apple', 1999, 3, 'M2 Pro chip, 16GB RAM, 512GB SSD', (SELECT id FROM categories WHERE name='Laptops')),
('ASUS ROG Zephyrus G14', 'ASUS', 1599, 4, 'Gaming laptop with RTX 4060 and Ryzen 9', (SELECT id FROM categories WHERE name='Laptops')),
('Samsung Odyssey G7', 'Samsung', 699, 5, '32-inch curved 240Hz gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('ASUS ROG Swift PG279QM', 'ASUS', 799, 3, '1440p 240Hz G-Sync gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('Corsair K100 RGB', 'Corsair', 249, 5, 'Optical-mechanical gaming keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('SteelSeries Apex Pro', 'SteelSeries', 199, 6, 'Adjustable actuation mechanical switches', (SELECT id FROM categories WHERE name='Keyboards')),
('Ducky One 3 Mini', 'Ducky', 110, 10, '60% hot-swappable mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Logitech G Pro X Superlight', 'Logitech', 150, 10, 'Ultra-lightweight wireless gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('Razer Viper V2 Pro', 'Razer', 140, 8, 'Top-tier wireless esports mouse', (SELECT id FROM categories WHERE name='Mice')),
('Intel Core i9-13900K', 'Intel', 589, 4, '24-core flagship processor for LGA1700', (SELECT id FROM categories WHERE name='Components')),
('AMD Ryzen 9 7950X', 'AMD', 549, 5, '16-core high-performance Zen 4 CPU', (SELECT id FROM categories WHERE name='Components'));
`;

async function initDB() {
  try {
    await client.connect();
    console.log('Connected to the database successfully.');

    await client.query(INIT_SQL);
    console.log('Database initialized successfully.');

    await client.query(SQL_DEFAULT_DATA);
    console.log('Default data inserted successfully.');

    await client.end();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

initDB();
