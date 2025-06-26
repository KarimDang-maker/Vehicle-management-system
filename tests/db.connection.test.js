// src/tests/db.connection.test.js

const { sequelize, testConnection } = require('../config/db');

(async () => {
  await testConnection();
  await sequelize.sync(); // synchronise les modèles avec la base
})();
