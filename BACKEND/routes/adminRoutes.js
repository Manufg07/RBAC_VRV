const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  addUserByAdmin,
  assignRoleToUser,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/add-user", addUserByAdmin);
router.post("/assign-role", assignRoleToUser);

module.exports = router;
