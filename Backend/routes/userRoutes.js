const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// routes/userRoutes.js
router.post('/register', async (req, res) => {
    const { nama, email, password } = req.body;
    try {
        if (!nama || !email || !password) {
            return res.status(400).json({ error: 'Semua field harus diisi' });
        }

        // Cek apakah email sudah digunakan
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email sudah digunakan' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ nama, email, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        console.error('Error during registration:', err); // Log error ke konsol
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({ error: 'Password salah' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
