const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  outline: {
    type: String,
    required: true,
  },
  outcomes: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
    required: true,
  },
  feature_img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
