const express = require("express");
const connectToMongoose = require("./config/db");
const cors = require("cors");
// const requestLogMiddleware = require("./middlewares/requestLogMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

connectToMongoose();

// app.use(requestLogMiddleware(app));

app.get("/", (req, res) => {
  res.send("Student Api Here");
});

// Student Routes
app.use("/student", require("./routes/studentRoutes"));

// Course Routes
app.use("/course", require("./routes/courseRoutes"));

//Auth Routes
app.use("/auth", require("./routes/userRoutes"));

// Blog Routes
app.use("/blog", require("./routes/blogRoutes"));

// Contact Us Routes
app.use("/contact", require("./routes/contactRoutes"));

// NewsLetter/Subscriber routes
app.use("/newsletter", require("./routes/subscribeRoutes"));

// Request Logs Routes
app.use("/requestlogs", require("./routes/requestLogRoutes"));

// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server is Running on port ${process.env.PORT || 5000}`);
// });

module.exports = app;
