const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Mise à jour du refresh token en base
    await user.update({ refreshToken });

    // Set les cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    res.status(201).json({ message: 'Connexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de connexion' });
  }
};

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token manquant' });
    }

    const user = await User.findOne({ where: { refreshToken } });
    
    if (!user) {
      return res.status(403).json({ message: 'Refresh token invalide' });
    }

    const newAccessToken = generateAccessToken(user.id);
    
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });

    res.json({ message: 'Token rafraîchi' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de rafraîchissement' });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.userId;
    await User.update({ refreshToken: null }, { where: { id: userId } });
    
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de déconnexion' });
  }
};

module.exports = { login, refresh, logout };