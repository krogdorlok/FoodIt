const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = 8000;
const mongoDB = require("./db");
mongoDB();

const cors = require("cors");

app.use;
cors({
  origin: [`${process.env.FRONTEND_URL}`],
});

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authentication"
  );

  next(); //middleware which links us to the next stage in the webapp after this stage is reached, and connects
  //us to another middleware.
  //acts out as a api to the req --> middleware --> response.
});
app.use(express.json());
app.use("/api", require("./Routes/createuser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.get("/", (req, res) => {
  res.send("DONE");
});

app.listen(port, () => {
  console.log(".");
});
