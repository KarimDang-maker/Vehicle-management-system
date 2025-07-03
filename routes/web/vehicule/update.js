const express = require('express');
const router = express.Router();
const axios = require('axios');

// TODO: Remplacer 'aRemplacer' par le token utilisateur dès que l'authentification sera prête
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'aRemplacer';

// Afficher le formulaire de modification
router.get('/:id', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.get(`${protocol}://${host}/api/vehicles/${req.params.id}`);
    const v = response.data;
    const html = `
      <html>
        <head><title>Modifier le véhicule</title></head>
        <body>
          <h1>Modifier le véhicule</h1>
          <form method="POST" action="/web/vehicule/update/${v.id}">
            <label>Marque: <input name="marque" value="${v.marque}" required></label><br>
            <label>Modèle: <input name="model" value="${v.model}" required></label><br>
            <label>Immatriculation: <input name="immatriculation" value="${v.immatriculation}" required></label><br>
            <label>Année: <input name="annee" type="number" value="${v.annee}" required></label><br>
            <label>Prix Location: <input name="prixLocation" type="number" value="${v.prixLocation}" required></label><br>
            <label>Disponible: <input name="disponible" type="checkbox" ${v.disponible ? 'checked' : ''}></label><br>
            <button type="submit">Enregistrer</button>
          </form>
          <a href="/web/vehicule/index">Retour à la liste</a>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération du véhicule<br>' + (error.response?.data?.message || error.message));
  }
});

// Traiter la modification
router.post('/:id', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const data = req.body;
    data.disponible = !!data.disponible;
    const host = req.get('host');
    const protocol = req.protocol;
    await axios.put(`${protocol}://${host}/api/vehicles/${req.params.id}`, data, {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    res.redirect('/web/vehicule/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la modification du véhicule<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router;
