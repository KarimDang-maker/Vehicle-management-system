const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('La marque doit être une chaîne de caractères.');
        }
      },
    },
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error('Le modèle doit être une chaîne de caractères.');
        }
      },
    },
  },
  immatriculation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^[A-Z0-9\-]+$/i, // ex: "AB-123-CD"
    },
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
  prixLocation: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0,
    },
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Vehicle;
