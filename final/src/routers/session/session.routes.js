const { Router } = require("express");
const SessionController = require("../../controllers/sessions.controller");
const activeSession = require("../../middlewares/session.middleware");

const router = Router();

router.post("/login", activeSession, SessionController.login);
router.get("/current", SessionController.currentSession);
router.get("/logout", SessionController.logout)

module.exports = router;
