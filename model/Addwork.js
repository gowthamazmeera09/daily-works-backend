const mongoose = require ('mongoose');

const addworkSchema = new mongoose.Schema({
    workname:{
        type:String,
        required:true
    },
    experiance:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    user:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})
const ADDWORK = mongoose.model('Addwork',addworkSchema);

module.exports = ADDWORK;
