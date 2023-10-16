const express = require("express")
const connectToMongoose = require("./config/db")
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())

connectToMongoose()

app.get("/", (req, res) => {
    res.send("Student Api Here")
})

// Student Routes
// app.use('/student', require('./routes/studentRoutes'))

// Course Routes
// app.use('/course', require('./routes/courseRoutes'))

//Auth Routes
// app.use('/auth', require('./routes/userRoutes'))

// Blog Routes
// app.use('/blog', require('./routes/blogRoutes'))

app.listen(5000, () => {
    console.log("Server is Running")
})
