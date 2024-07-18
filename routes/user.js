const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

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

module.exports = router;
