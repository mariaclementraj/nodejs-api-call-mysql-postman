const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Create
router.post('/register', (req, res) => {
    const { username, password, email, full_name, phone, address } = req.body;

    if (!username || !password || !email || !full_name || !phone || !address) {
        return res.status(400).send('All fields are required');
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO users (username, password, email, full_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [username, hashedPassword, email, full_name, phone, address];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('User registered successfully');
    });
});

// Read 
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.status(200).json(results);
    });
});

// Read 
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(results[0]);
    });
});

// Update 
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, full_name, phone, address } = req.body;

    if (!username || !email || !full_name || !phone || !address) {
        return res.status(400).send('All fields are required');
    }

    const query = 'UPDATE users SET username = ?, email = ?, full_name = ?, phone = ?, address = ? WHERE id = ?';
    const values = [username, email, full_name, phone, address, id];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User updated successfully');
    });
});

// Delete 
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    });
});

module.exports = router;
