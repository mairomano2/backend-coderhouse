const { Router } = require("express");
const UsersController = require("../../controllers/users.controller");
const { premiumAuth } = require("../../middlewares/auth.middleware");
const multer = require("multer");

const uploader = multer({ dest: "./public/documents" });

const router = Router();

router.get("/", UsersController.getAll);
router.get("/:id", UsersController.getById);
router.post("/", UsersController.create);
router.put("/:id", UsersController.updateById);
router.delete("/:id", UsersController.delete);
router.post("/premium/:id", UsersController.changeRole);
router.post("/premium/:id/documents/profile", uploader.single("file"), UsersController.addProfile);
router.post("/premium/:id/documents/documents", uploader.single("file"), UsersController.addDocuments);
router.post("/premium/:id/documents/products", uploader.single("file"), UsersController.addProducts);


module.exports = router;