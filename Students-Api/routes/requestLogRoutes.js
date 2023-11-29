const express = require("express");
const {
  fetchAll,
  fetchByMethod,
} = require("../controllers/requestLogController");

const router = express.Router();

router.get("/all", fetchAll);

router.get("/method/:method", fetchByMethod);

module.exports = router;
