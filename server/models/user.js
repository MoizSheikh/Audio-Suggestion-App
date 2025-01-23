

const mongoose = require("mongoose");
const UserSchema=mongoose.Schema({
    first_name:{
        type: String,
        maxlength: 100
    },
    last_name:{
        type: String,
        maxlength: 100
    },
     email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    password2:{
        type:String,
        minlength:8

    },
    is_admin:{
        type:Boolean
    },
    is_active:{
        type:Boolean,

    }

})


module.exports=mongoose.model('User',UserSchema);