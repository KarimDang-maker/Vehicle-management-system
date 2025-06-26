const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token manquant dans le header Authorization' });
  }

  const token = authHeader.split(' ')[1]; // format: Bearer <token>
  const VALID_TOKEN = process.env.API_TOKEN || 'mon_token_secret';

  if (token !== VALID_TOKEN) {
    return res.status(403).json({ message: 'Accès refusé. Token invalide.' });
  }

  next();
};

module.exports = auth;
