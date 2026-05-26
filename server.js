// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./src/db'); // mysql connection

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// helper functions
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ===== ROUTES =====

// register customer
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Missing fields' });

  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashed, 'customer'],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Registered successfully' });
    }
  );
});

// login (customer/admin)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!results.length) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, role: user.role });
  });
});

// create reservation (customer)
app.post('/api/reservations', authMiddleware, (req, res) => {
  if (req.user.role !== 'customer') return res.status(403).json({ message: 'Forbidden' });

  const { date, time, people } = req.body;
  db.query(
    'INSERT INTO reservations (user_id, date, time, people, status) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, date, time, people, 'pending'],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Reservation created', id: result.insertId });
    }
  );
});

// get all reservations (admin)
app.get('/api/admin/reservations', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  db.query(
    'SELECT r.*, u.name, u.email FROM reservations r JOIN users u ON r.user_id = u.id ORDER BY r.date ASC',
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
});

// update reservation status (admin)
app.patch('/api/admin/reservations/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { status } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE reservations SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Reservation updated' });
    }
  );
});

// serve front-end
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// start server
app.listen(PORT, () => {
  console.log(`Ruthy's Eatery server running on port ${PORT}`);
});
