const activeSession = (req, res, next) => {
  if(req.session.sessionUser){
    throw new Error("Ya hay una sesión creada")
  } else {
    next()
  }
}

module.exports = activeSession