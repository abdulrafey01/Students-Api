const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("BlazeImage", imageSchema);
