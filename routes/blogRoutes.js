const express = require("express")
const { create, fetchBlogs, fetchOne, remove, update } = require("../controllers/blogController")

const { runValidation } = require("../validators/index")
const { blogValidators } = require("../validators/blogValidators")

const router = express.Router()

// Add Blog
router.post("/add", blogValidators, runValidation,  create)

// Get Blogs With Pagination
router.get("/get/:page", fetchBlogs)

// Get Single Blog Details
router.get("/fetchone/:id", fetchOne)

// Delete Blog
router.delete("/remove/:id", remove)

// Update Blog
router.put("/update/:id",  update)

module.exports = router