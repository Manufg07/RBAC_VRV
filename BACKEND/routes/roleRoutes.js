const express = require("express");
const router = express.Router();
const {
  addRole,
  getRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");

const { assignRoleToUser } = require("../controllers/adminController");


router.post("/", addRole);
router.get("/", getRoles);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);


router.post("/assign-role", assignRoleToUser);

module.exports = router;
