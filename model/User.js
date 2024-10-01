const mongoose = require ('mongoose');

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    profilePicture: { // New field added
        type: String,
        default: '' // Optional: default to empty string if not provided
    },
    addwork:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Addwork'
        }
    ]
    
})

const User = mongoose.model('User',userschema);

module.exports = User;
