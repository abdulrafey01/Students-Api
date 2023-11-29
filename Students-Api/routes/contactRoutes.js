const express = require("express");
const {
  create,
  fetchAll,
  remove,
} = require("../controllers/contactControllers");

const router = express.Router();

router.post("/post", create);

router.get("/get", fetchAll);

router.delete("/delete/:id", remove);

module.exports = router;
