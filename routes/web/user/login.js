const express = require('express');
const router = express.Router();
const axios = require('axios');

// Afficher le formulaire de connexion
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>Connexion</title></head>
      <body>
        <h1>Connexion</h1>
        <form method="POST" action="/web/user/login">
          <label>Email: <input name="email" type="email" required></label><br>
          <label>Mot de passe: <input name="password" type="password" required></label><br>
          <button type="submit">Se connecter</button>
        </form>
        <a href="/web/user/index">Retour à la liste des utilisateurs</a>
      </body>
    </html>
  `;
  res.send(html);
});

// Traiter la connexion
router.post('/', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password
    };
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.post(`${protocol}://${host}/api/users/login`, data);
    
    // Si la connexion réussit, rediriger vers la liste des utilisateurs
    res.redirect('/web/user/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la connexion<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router; 