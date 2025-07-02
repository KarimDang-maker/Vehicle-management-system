// src/config/db.js

require('dotenv').config(); // charge les variables depuis .env
const { Sequelize } = require('sequelize');

// Création de l'instance Sequelize avec les infos du .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Mets à true pour voir les requêtes SQL
  }
);

// Fonction pour tester la connexion à la base
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base MySQL réussie.');
  } catch (error) {
    console.error('❌ Échec de connexion à la base MySQL :', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  testConnection,
};
