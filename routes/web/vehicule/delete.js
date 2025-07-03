const express = require('express');
const router = express.Router();
const axios = require('axios');

// TODO: Remplacer 'aRemplacer' par le token utilisateur dès que l'authentification sera prête
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'aRemplacer';

router.post('/:id', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    await axios.delete(`${protocol}://${host}/api/vehicles/${req.params.id}`, {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    res.redirect('/web/vehicule/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression du véhicule<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router;
