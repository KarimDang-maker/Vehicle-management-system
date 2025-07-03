const express = require('express');
const router = express.Router();
const axios = require('axios');

// TODO: Remplacer 'aRemplacer' par le token utilisateur dès que l'authentification sera prête
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'aRemplacer';

// Afficher le formulaire de création
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>Créer un véhicule</title></head>
      <body>
        <h1>Créer un véhicule</h1>
        <form method="POST" action="/web/vehicule/create">
          <label>Marque: <input name="marque" required></label><br>
          <label>Modèle: <input name="model" required></label><br>
          <label>Immatriculation: <input name="immatriculation" required></label><br>
          <label>Année: <input name="annee" type="number" required></label><br>
          <label>Prix Location: <input name="prixLocation" type="number" required></label><br>
          <label>Disponible: <input name="disponible" type="checkbox"></label><br>
          <button type="submit">Créer</button>
        </form>
        <a href="/web/vehicule/index">Retour à la liste</a>
      </body>
    </html>
  `;
  res.send(html);
});

// Traiter la création
router.post('/', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const data = {
      marque: req.body.marque,
      model: req.body.model,
      immatriculation: req.body.immatriculation,
      annee: parseInt(req.body.annee, 10),
      prixLocation: parseFloat(req.body.prixLocation),
      disponible: !!req.body.disponible
    };
    const host = req.get('host');
    const protocol = req.protocol;
    await axios.post(`${protocol}://${host}/api/vehicles`, data, {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    res.redirect('/web/vehicule/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la création du véhicule<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router;
