const express = require("express");
const { create, fetchAll } = require("../controllers/contactControllers");

const router = express.Router();

router.post("/post", create);

router.get("/get", fetchAll);

module.exports = router;
