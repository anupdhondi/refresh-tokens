require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const api = require("./routes");
//initialize express app
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-auth-token");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup database connection
mongoose
  .connect("mongodb://localhost:27017/authdemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));
//setup routes:
app.get("/", (req, res) => {
  return res.status(200).send("ok");
});
app.use("/api", api);
//start server and listen on port 4000
app.listen(5000, () => console.log("Server Running on port 5000"));
