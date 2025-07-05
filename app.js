const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

const vehicleRoutes = require('./routes/vehicle.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const PORT = process.env.PORT || 3000;

// 📦 Middlewares globaux
app.use(express.json());
app.use(logger); // ✅ log des requêtes

// 📚 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🚗 Routes API
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// 🏠 Route par défaut
app.get('/', (req, res) => {
  res.send('🚀 API Véhicules est en ligne !');
});

// ❌ Gestion globale des erreurs
app.use(errorHandler); // ✅ à la toute fin

// 🚀 Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚗 Serveur en écoute sur http://localhost:${PORT}`);
});

module.exports = app;