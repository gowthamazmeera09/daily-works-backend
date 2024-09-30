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
    imageUrl: { 
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s",
        required:true

    },
    // imageUrl: {
    //      type: String, 
    //      default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
    //  },
    addwork:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Addwork'
        }
    ]
    
})

const User = mongoose.model('User',userschema);

module.exports = User;
