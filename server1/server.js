const express = require("express");
const connectToDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Server1");
});
dotenv.config();

// app.use(cors());

// app.listen(4000, () => {
//   console.log("Server Listening on port 4000");
// });

connectToDb();

app.use("/user/", require("./routes/userRoutes"));

app.use("/attendance/", require("./routes/attendanceRoutes"));

app.use("/admin/", require("./routes/adminRoutes"));

module.exports = app;
