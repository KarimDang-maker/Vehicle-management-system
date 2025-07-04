const express = require('express');
const router = express.Router();
const authController = require('../controllers/authuseur.controller');
const userController = require('../controllers/user.controller');

router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router;
