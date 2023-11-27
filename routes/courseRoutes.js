const express = require("express");
const {
  create,
  fetchAll,
  fetchOne,
  remove,
  update,
} = require("../controllers/courseController");

const { uploadMulter } = require("../middlewares/multerMiddleware");

const router = express.Router();

router.post("/add", uploadMulter, create);

// router.post("/upload", uploadMulter, uploadImage);

router.get("/all", fetchAll);

router.get("/fetchone/:id", fetchOne);

router.put("/update/:id", update);

router.delete("/remove/:id", remove);
module.exports = router;
