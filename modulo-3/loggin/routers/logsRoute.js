const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  req.logger.error("This is a normal error")
  res.json({message: "logger test"})
});

module.exports = router