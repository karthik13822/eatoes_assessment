const express = require("express");
const router = express.Router();

const {
  getMenu,
  createMenu,
  deleteMenu,
  toggleAvailability,
  searchMenu,
} = require("../controllers/menuController");

router.get("/", getMenu);
router.get("/search", searchMenu);
router.post("/", createMenu);
router.delete("/:id", deleteMenu);
router.patch("/:id/availability", toggleAvailability);

module.exports = router;
