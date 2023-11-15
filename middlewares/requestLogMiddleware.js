const uaParser = require("ua-parser-js");
const requestLog = require("../models/RequestLog");
const { toMAC } = require("@network-utils/arp-lookup");

module.exports = function (app) {
  return async function (req, res, next) {
    try {
      const { originalUrl, method, ip } = req;

      const parts = ip.split(":");
      const ipAddress = parts[parts.length - 1];
      let userAgent = uaParser(req.headers["user-agent"]);

      console.log("ip " + ipAddress);
      console.log("browser " + userAgent.browser.name);
      console.log("os " + userAgent.os.name);
      console.log("method " + method);
      console.log("Api endpoint " + originalUrl);

      //Client Url
      const clientUrl = req.get("origin");
      console.log("Client Url " + clientUrl);

      // Client Mac Address
      const mac = await toMAC(ipAddress);
      console.log("Client Mac Address " + mac);

      const newLog = new requestLog({
        clientBrowser: userAgent.browser.name,
        clientOs: userAgent.os.name,
        clientIp: ipAddress,
        clientMac: mac,
        clientUrl: clientUrl,
        apiMethod: method,
        apiEndPoint: originalUrl,
      });
      await newLog.save();
    } catch (error) {
      console.log(error);
    }
    next();
  };
};

// module.exports = function (app) {
//   return async function (req, res, next) {
//     try {
//       const { originalUrl, method, ip } = req;

//       const parts = ip.split(":");
//       const ipAddress = parts[parts.length - 1];
//       console.log(ipAddress);
//       let userAgent = uaParser(req.headers["user-agent"]);

//       if (userAgent.browser.name == null) {
//         userAgent.browser.name = "Unknown";
//       }
//       if (userAgent.os.name == null) {
//         userAgent.os.name = "Unknown";
//       }
//       if (userAgent.device.name == null) {
//         userAgent.device.name = "Unknown";
//       }

//       const newLog = new requestLog({
//         url: originalUrl.toLowerCase(),
//         method: method.toLowerCase(),
//         ipAddress: ipAddress,
//         browser: userAgent.browser.name.toLowerCase(),
//         os: userAgent.os.name.toLowerCase(),
//         device: userAgent.device.name,
//       });

//       await newLog.save();
//     } catch (error) {
//       console.log(error);
//     }
//     next();
//   };
// };
