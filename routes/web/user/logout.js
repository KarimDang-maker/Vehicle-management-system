const express = require('express');
const router = express.Router();
const axios = require('axios');

// Afficher le formulaire de déconnexion
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>Déconnexion</title></head>
      <body>
        <h1>Déconnexion</h1>
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <form method="POST" action="/web/user/logout">
          <button type="submit">Se déconnecter</button>
        </form>
        <a href="/web/user/index">Annuler - Retour à la liste</a>
      </body>
    </html>
  `;
  res.send(html);
});

// Traiter la déconnexion
router.post('/', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.post(`${protocol}://${host}/api/users/logout`);
    
    res.send('Déconnexion réussie !<br><a href="/web/user/login">Se reconnecter</a>');
  } catch (error) {
    res.status(500).send('Erreur lors de la déconnexion<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router; 