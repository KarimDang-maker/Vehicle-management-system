const express = require('express');
const router = express.Router();
const { createUser, updateUser } = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.post('/', createUser);
router.put('/:id', auth, updateUser);

module.exports = router;