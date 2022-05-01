const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recording = new schema({
    name : {
        required:true,
        type:String
    },
    sur_name : {
        required:true,
        type:String
    },
    gmail : {
        required:true,
        type:String
    },
    password : {
        required:true,
        type:String
    }
},{timestamps:true});

module.exports = mongoose.model('recording',recording);
