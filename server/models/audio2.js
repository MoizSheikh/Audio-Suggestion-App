const mongoose = require("mongoose");
const AudioTrack2 = mongoose.Schema({
  file: {
    type: String,
  },
  file2: {
    type: String,
  },
  name: [{ type: String }],
});

module.exports = mongoose.model("Audio2", AudioTrack2);
