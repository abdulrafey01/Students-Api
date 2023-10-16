const mongoose = require('mongoose')

const connectToMongoose = ()=>{
mongoose.connect("mongodb+srv://AbdulRafey:LightsOfLife@cluster0.ayls3gp.mongodb.net/hive?retryWrites=true&w=majority").then(()=>{
    console.log("Connected To Database")
}).catch((e)=>{
    console.log(e.message)
})
}

module.exports = connectToMongoose