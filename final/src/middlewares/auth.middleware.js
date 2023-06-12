const adminAuth = (req, res, next) => {
  console.log("role:", req.session.sessionUser.role)
  if(req.session.sessionUser.role !== "admin"){
    throw new Error("No tiene los permisos para acceder a este recurso")
  } else {
    next()
  }
}

const premiumAuth = (req, res, next) => {
  if(req.session.sessionUser.role !== "premium"){
    throw new Error("No tiene los permisos para acceder a este recurso")
  } else {
    next()
  }
}

module.exports = { adminAuth, premiumAuth}