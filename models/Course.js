const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
        unique: true,
    },
    course_name: {
        type: String,
        required: true,
    },
    course_description: {
        type: String,
        required: true,
    },
    course_duration: {
        type: String,
        required: true,
    },
    course_outline: {
        type: String,
        required: true,
    },
    course_outcomes: {
        type: String,
        required: true,
    },
    course_type: {
        type: String,
        required: true,
        enum: ["On-site", "Remote"],
   },
});

module.exports = mongoose.model("Course", courseSchema);
