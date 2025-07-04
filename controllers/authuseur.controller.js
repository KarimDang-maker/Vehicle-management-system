const bcrypt = require('bcrypt');
const { generateToken, generateRefreshToken } = require('../utils/jwt');
const User = require('../models/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  const token = generateToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Stocker le refreshToken en base si nécessaire
  await user.update({ refreshToken });

  res.status(201).json({ token, refreshToken });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token manquant' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token invalide' });
    }

    const newToken = generateToken(user.id);
    res.status(201).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Refresh token invalide' });
  }
};

module.exports = { login, refreshToken };