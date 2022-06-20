const express = require("express");
const mongoose = require("mongoose");
const EmployeeRoutes = require("./routes/Employe");
const ProjectRoutes = require("./routes/Project");
const Sub_TaskRoutes = require("./routes/Subtask");
const TaskRoutes = require("./routes/Task");
const userRoutes = require("./routes/user");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");

const cors = require("cors");

const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("unable to connect database");
  });
app.use(bodyParser.json());
app.use(cookieparser());

app.use(express.json());
app.use(cors());

//? ======================================================
// !use parsing middlewares

// //! using the routes
app.use("/api", userRoutes); //?you can use any thing as a route am use /api
app.use("/api/Employee", EmployeeRoutes);
app.use("/api/Project", ProjectRoutes);
app.use("/api/Task", TaskRoutes);
app.use("/api/Sub_Task", Sub_TaskRoutes);

//?==========================================

const port = 5000;

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
