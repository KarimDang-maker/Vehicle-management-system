const express = require('express');
const router = express.Router();
const axios = require('axios');

// Afficher le formulaire de rafraîchissement
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>Rafraîchir le token</title></head>
      <body>
        <h1>Rafraîchir le token d'authentification</h1>
        <p>Cette action va rafraîchir votre token d'accès.</p>
        <form method="POST" action="/web/user/refresh">
          <button type="submit">Rafraîchir le token</button>
        </form>
        <a href="/web/user/index">Retour à la liste des utilisateurs</a>
      </body>
    </html>
  `;
  res.send(html);
});

// Traiter le rafraîchissement
router.post('/', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.post(`${protocol}://${host}/api/users/refresh`);
    
    res.send('Token rafraîchi avec succès !<br><a href="/web/user/index">Retour à la liste</a>');
  } catch (error) {
    res.status(500).send('Erreur lors du rafraîchissement du token<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router; 