const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebaseAuth");
const { 
  getBuyBox, 
  createBuyBox, 
  updateBuyBox, 
  deleteBuyBox 
} = require("../controllers/buyerController");

// All routes require authentication
router.get("/buybox", firebaseAuth, getBuyBox);
router.post("/buybox", firebaseAuth, createBuyBox);
router.put("/buybox", firebaseAuth, updateBuyBox);
router.delete("/buybox", firebaseAuth, deleteBuyBox);

module.exports = router;
