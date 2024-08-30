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
    profilepicture:{
        type:String,
        default:"https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
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
