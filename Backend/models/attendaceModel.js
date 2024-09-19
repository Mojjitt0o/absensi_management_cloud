const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attendance = sequelize.define('Attendance', {
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
    scan_type: { type: DataTypes.STRING, allowNull: false }, // Masuk atau Keluar
    lokasi: { type: DataTypes.STRING, allowNull: true },
    catatan: { type: DataTypes.TEXT, allowNull: true },
    foto_depan: { type: DataTypes.STRING, allowNull: true },
    foto_belakang: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

module.exports = Attendance;
