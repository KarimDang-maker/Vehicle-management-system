const express = require('express');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicle.routes');
// const logger = require('./middlewares/logger');         // ✅ Correction du chemin
// const errorHandler = require('./middlewares/errorHandler');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');   // ⚠️ Assure-toi que le fichier est bien là

const app = express();
const PORT = process.env.PORT || 3000;

// 📦 Middlewares globaux
// app.use(express.json());
// app.use(logger); // Logging des requêtes

// 📚 Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🚗 Routes API
app.use('/api/vehicles', vehicleRoutes);

// 🏠 Route par défaut
app.get('/', (req, res) => {
  res.send('🚀 API Véhicules est en ligne !');
});

// // ❌ Gestion d’erreurs globales
// app.use(errorHandler);

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚗 Serveur en écoute sur http://localhost:${PORT}`);
});

module.exports = app;
