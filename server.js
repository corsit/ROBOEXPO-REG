const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI);

const particiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [1, "Enter your name"],
  },
  email: {
    type: String,
    required: [1, "Enter your email"],
  },
  phone: {
    type: String,
    required: [1, "Enter your phone no."],
  },
  usn: {
    type: String,
    required: [1, "Enter your usn"],
  },
});

const user = mongoose.model("user", particiSchema);

app.post("/registerteam", function (req, res) {
  const gp = new user({
    name: req.body.name,
    email: req.body.email,
    usn: req.body.usn,
    phone: req.body.phone,
  });
  gp.save((err) => {
    if (err) {
      console.log(err);
    } else res.sendStatus(200);
  });
});
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client-form/build"));
//   }
//   app.use(express.static("client-form/build"));
//   app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/client-form/build/index.html");
//   });
//   app.get("*", (req, res) => {
//     res.sendFile(__dirname + "/client-form/build/index.html");
//   });
app.listen(PORT, () => {
  console.log("Server is up and running on the port " + PORT);
});