const express = require("express");
const mongoose = require("mongoose");

const router = require('express').Router();
var multer = require('multer');
const cors = require('cors')
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

router.use(express.static(__dirname+"./../client/public"))
const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(mp3|wav|mpeg)$/)) {
      req.fileValidationError = 'Only audio files are allowed!';
      return cb(new Error('Only image audio are allowed!'), false);
  }
  cb(null, true);
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './../client/public/uploads/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});



const upload = multer({ storage: storage ,fileFilter:imageFilter});

var fs = require('fs');
var path = require('path');
const logger = require("morgan");
//const url = "mongodb://localhost/workout";
const db=require('./config/config').get(process.env.NODE_ENV);
const bodyParser = require('body-parser')

const routes = require('./routes/user');

const routes1 = require('./routes/audio');
const routes2 = require('./routes/audio2');

const app = express();

app.use(logger("dev"));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use(express.static("./../client/build"));
app.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);


app.use(routes);

app.use(routes1);

app.use(routes2);





//if(process.env.NODE_ENV==="production"){

  app.use(express.static(path.join(__dirname,"../client/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','client','build','index.html'));
  })
//}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
