const express = require("express");
const { create } = require("../controllers/subscribeControllers");
const router = express.Router();

// Add Subscriber
router.post("/add", create);

module.exports = router;
