const router = require("express").Router();
const express = require("express");
var multer = require("multer");

var fs = require("fs");
var path = require("path");
router.use(express.static(__dirname + "./../client/public"));
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(mp3|wav|mpeg)$/)) {
    req.fileValidationError = "Only audio files are allowed!";
    return cb(new Error("Only image audio are allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/build/uploads/");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage, fileFilter: imageFilter });
const auth = require("./../middleware/auth");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const AudioTrack = require("./../models/audio");

router.post("/api/add", upload.single("file"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(url);
  const x = url + "/uploads/" + req.file.filename;
  console.log(x);
  const nameArr = req.body.name.split(",");
  const audioData = new AudioTrack({ file: x, name: nameArr });
  audioData.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", success: false });
    }
    res.status(200).json({
      succes: true,
      message: "Audio added successfully!",
      data: doc,
    });
  });
});

router.get("/api/getAllAudios", (req, res) => {
  AudioTrack.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", success: false });
    }
    res.status(200).json({
      succes: true,
      data: doc,
    });
  });
});

router.delete("/api/delete/:id", (req, res) => {
  AudioTrack.findOneAndDelete({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", success: false });
    }
    res.status(200).json({
      succes: true,
      message: "delete success",
    });
  });
});

router.get("/api/get", (req, res) => {
  var qname = req.query.name || "";
  if (!qname.length) {
    res.status(404).json({ msg: "Invalid name in query string" });
    res.end();
    return;
  }
  AudioTrack.findOne({ name: qname }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", succes: false });
    }
    res.status(200).json({
      succes: true,
      data: doc,
    });
  });
});

router.get("/api/getAll", (req, res) => {
  AudioTrack.find({}, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", success: false });
    }
    res.status(200).json({
      succes: true,
      data: doc,
    });
  });
});

router.delete("/api/delete/:id", (req, res) => {
  AudioTrack.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", success: false });
    }
    res.status(200).json({
      succes: true,
      message: "Delete successfully",
    });
  });
});

module.exports = router;
