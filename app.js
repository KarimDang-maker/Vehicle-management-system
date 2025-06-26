const express = require('express');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicle.routes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

// 📦 Middlewares globaux
app.use(express.json()); // ✅ OBLIGATOIRE pour lire req.body

// 📚 Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🚗 Routes API
app.use('/api/vehicles', vehicleRoutes);

// 🏠 Route par défaut
app.get('/', (req, res) => {
  res.send('🚀 API Véhicules est en ligne !');
});

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚗 Serveur en écoute sur http://localhost:${PORT}`);
});

module.exports = app;
