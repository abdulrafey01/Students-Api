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
    res.send("Hello World. Student Api Here")
})

app.use('/student', require('./routes/studentRoutes'))

app.listen(5000, () => {
    console.log("Server is listening")
})

// app.listen(()=>{
//     console.log("Server Is Running")
// })