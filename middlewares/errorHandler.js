const errorHandler = (err, req, res, next) => {
  console.error('💥 ERREUR :', err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    status: err.status || 500,
  });
};

module.exports = errorHandler;
