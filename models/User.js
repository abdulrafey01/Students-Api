const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: {
      type: String,  
      required: true,
      trim:true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    role:{
        type: String,
        enum: ["Student", "Admin", "Author"],
        default: "Student",
    }
})

module.exports = mongoose.model("User", authSchema)