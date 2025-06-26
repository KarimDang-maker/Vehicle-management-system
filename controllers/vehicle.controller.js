const Vehicle = require('../models/vehicle.model');

// 🔹 Récupérer tous les véhicules
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Récupérer un véhicule par ID
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule introuvable' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Créer un véhicule
const createVehicle = async (req, res) => {
  try {
    const { marque, model, immatriculation, annee, prixLocation } = req.body;

    const newVehicle = await Vehicle.create({
      marque,
      model,
      immatriculation,
      annee,
      prixLocation,
    });

    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Mettre à jour un véhicule
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { marque, model, immatriculation, annee, prixLocation, disponible } = req.body;

    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    await vehicle.update({ marque, model, immatriculation, annee, prixLocation, disponible });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔹 Supprimer un véhicule
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    await vehicle.destroy();
    res.status(200).json({ message: 'Véhicule supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
