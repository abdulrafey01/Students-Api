const mongoose = require("mongoose");

const requestLogSchema = new mongoose.Schema({
  clientBrowser: {
    type: String,
  },
  clientOs: {
    type: String,
  },
  clientIp: {
    type: String,
  },
  clientMac: {
    type: String,
  },
  clientUrl: {
    type: String,
  },
  apiMethod: {
    type: String,
  },
  apiEndPoint: {
    type: String,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("RequestLog", requestLogSchema);
