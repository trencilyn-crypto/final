require('dotenv').config();
const bcrypt = require('bcryptjs');
const { getPool } = require('./db');

async function initDb() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(120) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
      phone VARCHAR(30),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(255),
      price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      is_available BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      reservation_date DATE NOT NULL,
      reservation_time TIME NOT NULL,
      guest_count INT NOT NULL,
      phone VARCHAR(30) NOT NULL,
      special_request TEXT,
      status ENUM('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ruthys.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
  const adminName = process.env.ADMIN_NAME || "Ruthy's Admin";

  const [admins] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [adminEmail]);
  if (admins.length === 0) {
    const hash = await bcrypt.hash(adminPassword, 12);
    await pool.query(
      'INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
      [adminName, adminEmail, hash, 'admin', '09123456789']
    );
    console.log(`seeded admin: ${adminEmail}`);
  }

  const [menuCount] = await pool.query('SELECT COUNT(*) AS total FROM menu_items');
  if (Number(menuCount[0].total) === 0) {
    await pool.query(
      `INSERT INTO menu_items (name, description, price) VALUES
        ('Pancit Canton Bilao', 'Good for small family gatherings and office snacks.', 650.00),
        ('Chicken Inasal Meal', 'Grilled chicken with rice and house sauce.', 145.00),
        ('Pork Sisig Plate', 'Sizzling-style sisig served with rice.', 160.00),
        ('Lumpiang Shanghai Tray', 'Party tray with sweet chili dip.', 480.00),
        ('Halo-Halo Special', 'Classic Filipino dessert with creamy toppings.', 95.00)`
    );
    console.log('seeded menu items');
  }
}

if (require.main === module) {
  initDb()
    .then(() => {
      console.log('database is ready');
      process.exit(0);
    })
    .catch((error) => {
      console.error('database init failed:', error.message);
      process.exit(1);
    });
}

module.exports = initDb;
