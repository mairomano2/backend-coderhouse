const { Router } = require("express");
const SessionController = require("../../controllers/sessions.controller");
const passportCustom = require("../../middlewares/passport.middleware");

const router = Router();

router.post("/login", SessionController.login);
router.get("/current", passportCustom("jwt"), SessionController.currentSession);

module.exports = router;
