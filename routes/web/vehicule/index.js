const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /web/vehicule/index
router.get('/', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.get(`${protocol}://${host}/api/vehicles`);
    const vehicles = response.data;

    // Générer le HTML du tableau
    let tableRows = vehicles.map(v => `
      <tr>
        <td>${v.id}</td>
        <td>${v.marque}</td>
        <td>${v.model}</td>
        <td>${v.immatriculation}</td>
        <td>${v.annee}</td>
        <td>${v.prixLocation}</td>
        <td>${v.disponible ? 'Oui' : 'Non'}</td>
        <td>
          <a href="/web/vehicule/update/${v.id}">Modifier</a>
          <form method="POST" action="/web/vehicule/delete/${v.id}" style="display:inline" onsubmit="return confirm('Supprimer ce véhicule ?');">
            <button type="submit">Supprimer</button>
          </form>
        </td>
      </tr>
    `).join('');

    const html = `
      <html>
        <head>
          <title>Liste des véhicules</title>
        </head>
        <body>
          <h1>Liste des véhicules</h1>
          <a href="/web/vehicule/create">Créer un véhicule</a>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Modèle</th>
                <th>Immatriculation</th>
                <th>Année</th>
                <th>Prix Location</th>
                <th>Disponible</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des véhicules');
  }
});

module.exports = router;
