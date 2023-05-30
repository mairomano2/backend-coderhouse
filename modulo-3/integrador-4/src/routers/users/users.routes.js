const { Router } = require("express")
const UsersController = require("../../controllers/users.controller")

const router = Router()

router.get("/", UsersController.getAll)
router.get("/:id", UsersController.getById)
router.post("/", UsersController.create)
router.put("/:id", UsersController.updateById)
router.delete("/:id", UsersController.delete)

module.exports = router