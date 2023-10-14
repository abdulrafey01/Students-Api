const express = require("express")
const { signup, activateAccount, signin , googleLogin} = require("../controllers/userControllers")

const router = express.Router()

router.post("/signup", signup)

router.post("/activate",activateAccount )

router.post('/login', signin)

router.post('/googlelogin',googleLogin)
module.exports = router