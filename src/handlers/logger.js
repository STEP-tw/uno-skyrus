const logRequest = function(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  console.log(req.cookies);
  next();
};

module.exports = { logRequest };
