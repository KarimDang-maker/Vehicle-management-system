const express = require('express');
const router = express.Router();

const {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  findByImmatriculation,
  findByMaxPrix,
} = require('../controllers/vehicle.controller');

// 🔹 Récupérer tous les véhicules
router.get('/', getAllVehicles);

// 🔹 Récupérer un véhicule par ID
router.get('/:id', getVehicleById);

// 🔹 Créer un nouveau véhicule
router.post('/', createVehicle);

// 🔹 Mettre à jour un véhicule existant
router.put('/:id', updateVehicle);

// 🔹 Supprimer un véhicule
router.delete('/:id', deleteVehicle);

// 🔍 Rechercher par immatriculation
router.get('/search/immatriculation/:value', findByImmatriculation);

// 💰 Rechercher par prix maximum
router.get('/search/prix', findByMaxPrix);

module.exports = router;
