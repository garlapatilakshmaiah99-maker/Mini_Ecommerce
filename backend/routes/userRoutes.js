const express = require("express");
const router = express.Router();

const { getUsers,getUserById,deleteUser } = require("../controllers/UserController");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/delete/:id", deleteUser);

module.exports = router;