const mongoose = require("mongoose");
const AudioTrack=mongoose.Schema({

    file:{
        type:String
    },
    name:[{type:String}]

})


module.exports=mongoose.model('Audio',AudioTrack);