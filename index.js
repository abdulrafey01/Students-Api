const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Index.js");
});

app.use("/server1/", require("./server1/server"));

app.use("/server2/", require("./server2/server"));

app.use("/server3/", require("./Students-Api/server"));
app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
