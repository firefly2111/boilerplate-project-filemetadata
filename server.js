'use strict';
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
// require and use "multer"...
var multer = require("multer");
var upload = multer({dest: "./public"});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.route("/api/fileanalyse").post(
  upload.single("upfile"), (req, res) => {
    var fileSize = req.file.size + " bytes";
    res.json({name: req.file.originalname, size: fileSize});
  }
)


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
