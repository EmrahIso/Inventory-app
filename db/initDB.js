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
  name VARCHAR(100) UNIQUE NOT NULL,
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
('HP Spectre x360', 'HP', 1350, 5, '2-in-1 convertible with OLED touch screen', (SELECT id FROM categories WHERE name='Laptops')),
('Dell XPS 13', 'Dell', 1199, 6, 'Ultrathin laptop with InfinityEdge display', (SELECT id FROM categories WHERE name='Laptops')),
('Acer Swift 5', 'Acer', 899, 8, 'Ultra-lightweight professional laptop', (SELECT id FROM categories WHERE name='Laptops')),
('MSI Katana GF66', 'MSI', 1100, 6, 'Gaming laptop with RTX 3050 Ti', (SELECT id FROM categories WHERE name='Laptops')),
('Microsoft Surface Laptop 5', 'Microsoft', 1299, 4, 'Sleek design with PixelSense touchscreen', (SELECT id FROM categories WHERE name='Laptops')),
('Samsung Galaxy Book3 Pro', 'Samsung', 1450, 3, 'AMOLED display, thin and light productivity', (SELECT id FROM categories WHERE name='Laptops')),
('Lenovo Legion 5 Pro', 'Lenovo', 1499, 5, 'QHD 165Hz gaming powerhouse', (SELECT id FROM categories WHERE name='Laptops')),
('Gigabyte Aero 14', 'Gigabyte', 1699, 2, 'OLED display for creative professionals', (SELECT id FROM categories WHERE name='Laptops')),
('ASUS Vivobook 15', 'ASUS', 650, 12, 'Affordable everyday laptop with OLED screen', (SELECT id FROM categories WHERE name='Laptops')),
('HP Pavilion 15', 'HP', 750, 10, 'Balanced performance for students and office', (SELECT id FROM categories WHERE name='Laptops')),
('Acer Nitro 5', 'Acer', 950, 7, 'Popular entry-level gaming laptop', (SELECT id FROM categories WHERE name='Laptops')),
('Razer Blade 14', 'Razer', 2399, 3, 'Powerful gaming specs in a compact 14-inch body', (SELECT id FROM categories WHERE name='Laptops')),
('Samsung Odyssey G7', 'Samsung', 699, 5, '32-inch curved 240Hz gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('ASUS ROG Swift PG279QM', 'ASUS', 799, 3, '1440p 240Hz G-Sync gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('BenQ PD3220U', 'BenQ', 1199, 4, '32-inch 4K Designer Monitor with Thunderbolt 3', (SELECT id FROM categories WHERE name='Monitors')),
('ViewSonic Elite XG270QG', 'ViewSonic', 550, 6, 'Nano IPS 165Hz G-Sync gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('Gigabyte M27Q', 'Gigabyte', 320, 15, '1440p 170Hz monitor with KVM switch', (SELECT id FROM categories WHERE name='Monitors')),
('MSI Optix MAG274QRF-QD', 'MSI', 420, 8, 'Quantum Dot IPS gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('Acer Predator XB273U', 'Acer', 580, 5, 'High-end gaming with G-Sync support', (SELECT id FROM categories WHERE name='Monitors')),
('Alienware AW3423DW', 'Dell', 1299, 2, 'Ultrawide QD-OLED gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('Huawei MateView GT', 'Huawei', 499, 7, '34-inch ultrawide with integrated soundbar', (SELECT id FROM categories WHERE name='Monitors')),
('Philips Brilliance 279P1', 'Philips', 450, 9, '4K monitor with USB-C docking', (SELECT id FROM categories WHERE name='Monitors')),
('AOC 24G2', 'AOC', 199, 20, 'Legendary budget 144Hz IPS gaming monitor', (SELECT id FROM categories WHERE name='Monitors')),
('LG UltraWide 34WP65G', 'LG', 399, 6, '34-inch 21:9 UltraWide Full HD monitor', (SELECT id FROM categories WHERE name='Monitors')),
('BenQ Mobiuz EX2710', 'BenQ', 299, 10, '144Hz gaming monitor with HDRi technology', (SELECT id FROM categories WHERE name='Monitors')),
('HP Omen 27i', 'HP', 480, 5, '2K Nano IPS panel with 165Hz refresh rate', (SELECT id FROM categories WHERE name='Monitors')),
('Corsair K100 RGB', 'Corsair', 249, 5, 'Optical-mechanical gaming keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('SteelSeries Apex Pro', 'SteelSeries', 199, 6, 'Adjustable actuation mechanical switches', (SELECT id FROM categories WHERE name='Keyboards')),
('Ducky One 3 Mini', 'Ducky', 110, 10, '60% hot-swappable mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Leopold FC900R', 'Leopold', 140, 4, 'High-quality PBT keycaps and build', (SELECT id FROM categories WHERE name='Keyboards')),
('Anne Pro 2', 'Obinslab', 90, 12, '60% wireless mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Glorious GMMK Pro', 'Glorious', 170, 5, '75% barebone custom mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Razer Huntsman V2', 'Razer', 180, 8, 'Analog optical gaming keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Varmilo VA87M', 'Varmilo', 150, 4, 'TKL mechanical keyboard with Sakura theme', (SELECT id FROM categories WHERE name='Keyboards')),
('Microsoft Ergonomic Keyboard', 'Microsoft', 60, 20, 'Split ergonomic design for wrist comfort', (SELECT id FROM categories WHERE name='Keyboards')),
('NuPhy Air75', 'NuPhy', 130, 7, 'Low-profile wireless mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Apple Magic Keyboard', 'Apple', 99, 15, 'Sleek wireless keyboard for Mac users', (SELECT id FROM categories WHERE name='Keyboards')),
('HyperX Alloy Origins', 'HyperX', 110, 12, 'Compact keyboard with custom mechanical switches', (SELECT id FROM categories WHERE name='Keyboards')),
('Wooting 60HE', 'Wooting', 175, 2, 'Analog input 60% mechanical keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Royal Kludge RK61', 'Royal Kludge', 55, 25, 'Budget 60% RGB wireless keyboard', (SELECT id FROM categories WHERE name='Keyboards')),
('Logitech G Pro X Superlight', 'Logitech', 150, 10, 'Ultra-lightweight wireless gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('Razer Viper V2 Pro', 'Razer', 140, 8, 'Top-tier wireless esports mouse', (SELECT id FROM categories WHERE name='Mice')),
('SteelSeries Rival 3', 'SteelSeries', 35, 25, 'Reliable and affordable wired gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('Zowie EC2-C', 'BenQ', 70, 15, 'Ergonomic shape favored by CS:GO pros', (SELECT id FROM categories WHERE name='Mice')),
('Glorious Model O', 'Glorious', 50, 18, 'Lightweight honeycomb design RGB mouse', (SELECT id FROM categories WHERE name='Mice')),
('Corsair Dark Core RGB', 'Corsair', 80, 6, 'Wireless gaming mouse with Qi charging', (SELECT id FROM categories WHERE name='Mice')),
('HyperX Pulsefire Haste', 'HyperX', 50, 14, '62g ultra-lightweight gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('Pulsar X2 Wireless', 'Pulsar', 95, 9, 'Symmetrical lightweight wireless mouse', (SELECT id FROM categories WHERE name='Mice')),
('Logitech G502 HERO', 'Logitech', 60, 30, 'Classic multi-button gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('Razer Basilisk V3', 'Razer', 70, 15, 'Ergonomic mouse with 11 programmable buttons', (SELECT id FROM categories WHERE name='Mice')),
('Microsoft Arc Mouse', 'Microsoft', 80, 10, 'Ultra-portable mouse that snaps flat', (SELECT id FROM categories WHERE name='Mice')),
('SteelSeries Aerox 3', 'SteelSeries', 60, 12, 'Water-resistant lightweight gaming mouse', (SELECT id FROM categories WHERE name='Mice')),
('ASUS ROG Spatha X', 'ASUS', 150, 4, 'Large wireless MMO mouse with 12 buttons', (SELECT id FROM categories WHERE name='Mice')),
('Cooler Master MM711', 'Cooler Master', 45, 20, 'Super-light mouse with matte finish', (SELECT id FROM categories WHERE name='Mice')),
('Intel Core i9-13900K', 'Intel', 589, 4, '24-core flagship processor for LGA1700', (SELECT id FROM categories WHERE name='Components')),
('AMD Ryzen 9 7950X', 'AMD', 549, 5, '16-core high-performance Zen 4 CPU', (SELECT id FROM categories WHERE name='Components')),
('NVIDIA RTX 4070 Ti', 'NVIDIA', 799, 3, 'Excellent 1440p and 4K gaming performance', (SELECT id FROM categories WHERE name='Components')),
('ASUS ROG Strix Z790-E', 'ASUS', 499, 6, 'Top-tier motherboard for Intel 13th Gen', (SELECT id FROM categories WHERE name='Components')),
('Corsair Vengeance 32GB DDR5', 'Corsair', 160, 15, '6000MHz high-speed memory kit', (SELECT id FROM categories WHERE name='Components')),
('Samsung 990 Pro 1TB', 'Samsung', 130, 12, 'Fastest PCIe 4.0 NVMe SSD available', (SELECT id FROM categories WHERE name='Components')),
('Seasonic Prime TX-1000', 'Seasonic', 320, 4, '80+ Titanium modular 1000W PSU', (SELECT id FROM categories WHERE name='Components')),
('Noctua NH-D15', 'Noctua', 110, 10, 'Legendary dual-tower premium air cooler', (SELECT id FROM categories WHERE name='Components')),
('NZXT Kraken Elite 360', 'NZXT', 280, 3, 'Liquid cooler with customizable LCD display', (SELECT id FROM categories WHERE name='Components')),
('Lian Li PC-O11 Dynamic', 'Lian Li', 160, 8, 'Classic dual-chamber tempered glass case', (SELECT id FROM categories WHERE name='Components')),
('AMD Radeon RX 7900 XT', 'AMD', 899, 4, 'High-end RDNA 3 graphics card', (SELECT id FROM categories WHERE name='Components')),
('WD Black SN850X 2TB', 'Western Digital', 190, 8, 'Gaming optimized Gen4 NVMe SSD', (SELECT id FROM categories WHERE name='Components')),
('MSI MPG Z790 Edge WiFi', 'MSI', 350, 5, 'Stylish silver-themed Intel motherboard', (SELECT id FROM categories WHERE name='Components')),
('G.Skill Trident Z5 RGB 32GB', 'G.Skill', 170, 10, 'High-performance DDR5-6400 RAM kit', (SELECT id FROM categories WHERE name='Components'))

ON CONFLICT (name) DO NOTHING;
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
