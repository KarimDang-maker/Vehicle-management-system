const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Création d'un utilisateur
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mise à jour d'un utilisateur
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    await user.update({ name, email });
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lister tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password', 'refreshToken'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Afficher un utilisateur par ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password', 'refreshToken'] } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    await user.destroy();
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};