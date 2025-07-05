const express = require('express');
const router = express.Router();
const { createUser, updateUser, getAllUsers } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/', createUser);
router.put('/:id', auth, updateUser);
router.get('/', getAllUsers); // <-- Ajoute cette ligne

module.exports = router;