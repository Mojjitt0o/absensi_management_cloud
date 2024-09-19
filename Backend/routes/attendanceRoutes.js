const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendaceModel');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/scan', authenticateToken, async (req, res) => {
    const { scan_type, lokasi, catatan, foto_depan, foto_belakang } = req.body;
    try {
        const attendance = await Attendance.create({
            employeeId: req.user.id,
            scan_type,
            lokasi,
            catatan,
            foto_depan,
            foto_belakang
        });
        res.status(201).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
