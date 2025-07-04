const express = require('express');
require('dotenv').config();

const vehicleRoutes = require('./routes/vehicle.routes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const userroute     = require('./routes/user.route')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

// 📦 Middlewares globaux
app.use(express.json());
app.use(logger); // ✅ log des requêtes

// 📚 Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🚗 Routes API
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userroute);

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

//INTERFACES
app.use('/web/user/view', require('./routes/web/user/view'));
app.use('/web/user/index', require('./routes/web/user/index'));
app.use('/web/user/create', require('./routes/web/user/create'));
app.use('/web/user/update', require('./routes/web/user/update'));
app.use('/web/user/delete', require('./routes/web/user/delete'));
app.use('/web/user/login', require('./routes/web/user/login'));
app.use('/web/user/refresh', require('./routes/web/user/refresh'));
app.use('/web/user/logout', require('./routes/web/user/logout'));
app.use('/web/vehicule/index', require('./routes/web/vehicule/index'));
app.use('/web/vehicule/create', require('./routes/web/vehicule/create'));
app.use('/web/vehicule/update', require('./routes/web/vehicule/update'));
app.use('/web/vehicule/delete', require('./routes/web/vehicule/delete'));

module.exports = app;
