const uaParser = require("ua-parser-js");
const requestLog = require("../models/RequestLog");

module.exports = function (app) {
  return async function (req, res, next) {
    try {
      const { originalUrl, method } = req;
      let userAgent = uaParser(req.headers["user-agent"]);

      if (userAgent.browser.name == null) {
        userAgent.browser.name = "Unknown";
      }
      if (userAgent.os.name == null) {
        userAgent.os.name = "Unknown";
      }
      if (userAgent.device.name == null) {
        userAgent.device.name = "Unknown";
      }

      const newLog = new requestLog({
        url: originalUrl.toLowerCase(),
        method: method.toLowerCase(),
        browser: userAgent.browser.name.toLowerCase(),
        os: userAgent.os.name.toLowerCase(),
        device: userAgent.device.name,
      });
      await newLog.save();
    } catch (error) {
      console.log(error);
    }
    next();
  };
};
