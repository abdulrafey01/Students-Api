const express = require("express")
const {create, fetchAll, fetchOne, remove} = require("../controllers/studentController")
const {runValidation} = require("../validators/index")
const {studentValidators} = require("../validators/studentValidators")

const router = express.Router()

router.post("/add", studentValidators,  runValidation , create)

router.get("/fetchall", fetchAll)

router.get("/fetchone/:id", fetchOne)

router.delete("/remove/:id", remove)
module.exports = router