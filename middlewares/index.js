exports.userMiddleware = (req, res, next) => {
  req.user = { name: 'ooug', id: 123 };
  next();
};
