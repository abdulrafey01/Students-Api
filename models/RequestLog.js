const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  method: {
    type: String,
  },
  time: {
    type: String,
    default: new Date().toLocaleString(),
  },
  browser: {
    type: String,
  },
  os: {
    type: String,
  },
  device: {
    type: String,
  },
});

module.exports = mongoose.model("RequestLog", requestLogSchema);
