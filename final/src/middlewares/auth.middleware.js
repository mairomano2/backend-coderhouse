const adminAuth = (req, res, next) => {
  
  if (req.session.sessionUser.role !== "admin") {
    throw new Error("No tiene los permisos para acceder a este recurso");
  } else {
    next();
  }
};

const premiumAuth = (req, res, next) => {
  if (req.session.sessionUser.role !== "premium") {
    throw new Error("No tiene los permisos para acceder a este recurso");
  } else {
    next();
  }
};

const generalAuth = (req, res, next) => {
  if (req.session.sessionUser.role === "admin" || "premium") {
    next();
  } else {
    throw new Error("No tiene los permisos para acceder a este recurso");
  }
};



module.exports = { adminAuth, premiumAuth, generalAuth };
