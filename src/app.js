const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const models = require("../models")

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser 在2019年已经废弃
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

require("./home")(app, models)
require("./selfManagement")(app, models)

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message:err.message
    })
  }
})

app.listen("2000", function () {
  console.log("脚本成功-http://localhost:2000/*")
})