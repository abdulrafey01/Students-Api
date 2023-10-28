const express = require("express");
const { create } = require("../controllers/contactControllers");

const router = express.Router();

router.post("/post", create);

module.exports = router;
