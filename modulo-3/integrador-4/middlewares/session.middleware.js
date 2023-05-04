const activeSession = (req, res, next) => {
  if(req.session.sessionUser){
    console.log("session creada")
    throw new Error("Ya hay una sesión creada")
  } else {
    next()
  }
}

module.exports = activeSession