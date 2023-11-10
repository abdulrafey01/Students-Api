const requestlogs = require("../models/RequestLog");

exports.fetchAll = async (req, res) => {
  try {
    const logs = await requestlogs.find();
    res.status(200).json({
      logs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Fetch Logs",
    });
  }
};

// fetch by method
exports.fetchByMethod = async (req, res) => {
  try {
    const { method } = req.params;
    const logs = await requestlogs.find({ method: method });
    res.status(200).json({
      logs,
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable To Fetch Logs",
    });
  }
};
