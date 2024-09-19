const express = require("express");
const mongoDB = require("./utills/database");
const employeeRoutes = require("./routes/employeeRoutes");
const autRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

mongoDB();

//middleware
app.use(cors());
app.use(express.json());
//routes
app.use(employeeRoutes);
app.use(autRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8081, () => {
  console.log("server is running on 8081 port");
});
