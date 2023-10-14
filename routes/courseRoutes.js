const express = require("express")
const { create, fetchAll, fetchOne, remove, update } = require("../controllers/courseController")
const { courseValidators } = require("../validators/courseValidators")
const {runValidation} = require("../validators/index")


const router = express.Router()

router.post("/add",courseValidators, runValidation, create)

router.get("/all",fetchAll)

router.get("/fetchone/:id", fetchOne)

router.put("/update/:id", update)

router.delete("/remove/:id", remove)
module.exports = router