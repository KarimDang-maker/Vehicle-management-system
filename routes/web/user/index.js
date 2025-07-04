const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /web/user/index
router.get('/', async (req, res) => {
  try {
    const host = req.get('host');
    const protocol = req.protocol;
    const response = await axios.get(`${protocol}://${host}/api/users`);
    const users = response.data;

    // Générer le HTML du tableau
    let tableRows = users.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          <a href="/web/user/update/${u.id}">Modifier</a>
          <form method="POST" action="/web/user/delete/${u.id}" style="display:inline" onsubmit="return confirm('Supprimer cet utilisateur ?');">
            <button type="submit">Supprimer</button>
          </form>
        </td>
      </tr>
    `).join('');

    const html = `
      <html>
        <head>
          <title>Liste des utilisateurs</title>
        </head>
        <body>
          <h1>Liste des utilisateurs</h1>
          <a href="/web/user/create">Créer un utilisateur</a>
          <table border="1" cellpadding="5" cellspacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
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
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
});

module.exports = router; 