const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", auth('admin'), UserController.getAll);
router.post("/create", auth('admin'), UserController.create);
router.get("/:id", auth('admin'), UserController.getById);
router.put("/:id", auth('admin'), UserController.update);
router.delete("/:id", auth('admin'), UserController.delete);

module.exports = router;