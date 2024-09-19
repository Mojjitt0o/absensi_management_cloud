const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/edit', authenticateToken, async (req, res) => {
    const { id, nama, email, jabatan } = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) return res.status(404).json({ error: 'Karyawan tidak ditemukan' });

        employee.nama = nama;
        employee.email = email;
        employee.jabatan = jabatan;
        await employee.save();

        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
