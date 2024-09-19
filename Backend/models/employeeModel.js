const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    nama: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    jabatan: { type: DataTypes.STRING, allowNull: true },
    status_absen: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

module.exports = Employee;
