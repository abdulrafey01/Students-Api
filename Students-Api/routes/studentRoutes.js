const express = require("express");
const {
  create,
  fetchAll,
  fetchOne,
  remove,
  update,
} = require("../controllers/studentController");
const { runValidation } = require("../validators/index");
const { studentValidators } = require("../validators/studentValidators");

const router = express.Router();

router.post("/add", studentValidators, runValidation, create);

router.get("/all", fetchAll);

router.put("/update/:id", update);

router.get("/fetchone/:id", fetchOne);

router.delete("/remove/:id", remove);
module.exports = router;
