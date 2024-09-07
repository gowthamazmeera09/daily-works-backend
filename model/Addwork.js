const mongoose = require('mongoose');

const addWorkSchema = new mongoose.Schema({
    workname: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: [{ type: String }],
    user:[{
         type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    }]
});

const ADDWORK = mongoose.model('Addwork', addWorkSchema);
module.exports = ADDWORK;
