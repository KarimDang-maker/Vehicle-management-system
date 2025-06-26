const logger = (req, res, next) => {
  const now = new Date().toISOString();
  const { method, url } = req;
  console.log(`[${now}] ${method} ${url}`);
  next();
};

module.exports = logger;
