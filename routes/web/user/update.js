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
    const response = await axios.get(`${protocol}://${host}/api/users/${req.params.id}`);
    const u = response.data;
    const html = `
      <html>
        <head><title>Modifier l'utilisateur</title></head>
        <body>
          <h1>Modifier l'utilisateur</h1>
          <form method="POST" action="/web/user/update/${u.id}">
            <label>Nom: <input name="name" value="${u.name}" required></label><br>
            <label>Email: <input name="email" type="email" value="${u.email}" required></label><br>
            <label>Rôle: 
              <select name="role">
                <option value="user" ${u.role === 'user' ? 'selected' : ''}>Utilisateur</option>
                <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Administrateur</option>
              </select>
            </label><br>
            <button type="submit">Enregistrer</button>
          </form>
          <a href="/web/user/index">Retour à la liste</a>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur<br>' + (error.response?.data?.message || error.message));
  }
});

// Traiter la modification
router.post('/:id', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };
    const host = req.get('host');
    const protocol = req.protocol;
    await axios.put(`${protocol}://${host}/api/users/${req.params.id}`, data, {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    res.redirect('/web/user/index');
  } catch (error) {
    res.status(500).send('Erreur lors de la modification de l\'utilisateur<br>' + (error.response?.data?.message || error.message));
  }
});

module.exports = router; 