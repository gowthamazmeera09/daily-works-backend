const mongoose = require('mongoose');

const addWorkSchema = new mongoose.Schema({
    workname: {
        type: String,
        required: true,
        // Ensure this is not unique
        unique: false
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

const ADDWORK = mongoose.model('ADDWORK', addWorkSchema);
module.exports = ADDWORK;
