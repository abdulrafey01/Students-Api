const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        default:Date.now,
        unique: true
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        addressLine: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    course: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    qualification: {
        passingYear: {
            type: String,
            required: true
        },
        principle: {
            type: String,
            required: true
        },
        school: {
            type: String,
            required: true
        },
    },
    enrollmentType: {
        type: String,
        required: true,
        enum: ["On-site", "Remote"]
    },
    status: {
        type: String,
        required: true,
        enum: ["None", "Admission", "Student", "Alumni"],
        default: "None"
    },
    date: {
        type: Date,
    }
})

module.exports = mongoose.model("Student", studentSchema)