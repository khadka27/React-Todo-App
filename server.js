// backend/server.js
const express = require('express');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL database connected');
});

app.use(express.json());

// Create a todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;
  const sql = 'INSERT INTO todos (title, description) VALUES (?, ?)';
  db.query(sql, [title, description], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create todo' });
    } else {
      res.status(201).json({ message: 'Todo created successfully' });
    }
  });
});

// Read all todos
app.get('/api/todos', (req, res) => {
  const sql = 'SELECT * FROM todos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch todos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete todo' });
    } else {
      res.status(200).json({ message: 'Todo deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
