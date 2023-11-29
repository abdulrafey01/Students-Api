const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
