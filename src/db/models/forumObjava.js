const mongoose = require('mongoose');


const ForumObjavaShema = new mongoose.Schema({
    sadrzaj:{
        type: String,
        required: [true, 'Unesite sadržaj objave'],
        trim: true,
        minlength: 15,
    },
    
}, {
    timestamps: true
})


const ForumObjava = mongoose.model('ForumObjava', ForumObjavaShema)


module.exports = ForumObjava 