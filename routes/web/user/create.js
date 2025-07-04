const express = require('express');
const router = express.Router();
const axios = require('axios');

// TODO: Remplacer 'aRemplacer' par le token utilisateur dès que l'authentification sera prête
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'aRemplacer';

// Afficher le formulaire de création
router.get('/', (req, res) => {
  const html = `
    <html>
      <head><title>Créer un utilisateur</title></head>
      <body>
        <h1>Créer un utilisateur</h1>
        <form method="POST" action="/web/user/create">
          <label>Nom: <input name="name" required></label><br>
          <label>Email: <input name="email" type="email" required></label><br>
          <label>Mot de passe: <input name="password" type="password" required></label><br>
          <label>Rôle: 
            <select name="role">
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </label><br>
          <button type="submit">Créer</button>
        </form>
        <a href="/web/user/index">Retour à la liste</a>
      </body>
    </html>
  `;
  res.send(html);
});

// Traiter la création
router.post('/', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };
    const host = req.get('host');
    const protocol = req.protocol;
    await axios.post(`${protocol}://${host}/api/users`, data, {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    res.redirect('/web/user/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la création de l\'utilisateur<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router; 