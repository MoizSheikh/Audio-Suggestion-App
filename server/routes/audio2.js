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

const AudioTrack2 = require("./../models/audio2");
const AudioTrack = require("./../models/audio");

router.post("/api/add2", upload.single("file"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const x = url + "/uploads/" + req.file.filename;
  const nameArr = req.body.name.split(",");
  const audioData = new AudioTrack2({ file: x, name: nameArr });
  audioData.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", succes: false });
    }
    res.status(200).json({
      succes: true,
      message: "Audio added successfully!",
      data: doc,
    });
  });
});

router.get("/api/getAllAudios2", (req, res) => {
  AudioTrack2.find({}, (err, doc) => {
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

router.delete("/api/delete2/:id", (req, res) => {
  AudioTrack2.findOneAndDelete({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", succes: false });
    }
    res.status(200).json({
      succes: true,
      message: "delete success",
    });
  });
});

router.get("/api/table2/get", (req, res) => {
  var qname = req.query.name || "";
  if (!qname.length) {
    res.status(404).json({ msg: "Invalid name in query string" });
    res.end();
    return;
  }
  AudioTrack2.findOne({ name: qname }, (err, doc) => {
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

router.get("/api/get2", (req, res) => {
  var qname = req.query.name1 || "";
  if (!qname.length) {
    res.status(404).json({ msg: "Invalid name1 in query string" });
    res.end();
    return;
  }
  var qname1 = req.query.name2 || "";
  if (!qname1.length) {
    res.status(404).json({ msg: "Invalid name2 in query string" });
    res.end();
    return;
  }
  AudioTrack.find({ name: qname }, (err, doc) => {
    //console.log(doc);
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "error failed", succes: false });
    }
    AudioTrack2.find({ name: qname1 }, (err1, doc1) => {
      //console.log(doc1);
      if (err1) {
        console.log(err1);
        return res.status(400).json({ message: "error failed", succes: false });
      }

      res.status(200).json({
        succes: true,
        data: { doc, doc1 },
      });
    });
  });
});

router.get("/api/getAll2", (req, res) => {
  AudioTrack2.find({}, (err, doc) => {
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

router.delete("/api/delete2/:id", (req, res) => {
  AudioTrack2.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
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
