const express = require('express');
const router = express.Router();

// GET /web/user/view
router.get('/', (req, res) => {
  res.json({ message: 'Afficher un Utilisateur' });
});

// POST /web/user/view
router.post('/', (req, res) => {
  const data = req.body;
  // Logique de traitement
  res.json({ success: true, data });
});

module.exports = router;
