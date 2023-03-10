const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect("api/session/login")
  }
};

module.exports = auth;