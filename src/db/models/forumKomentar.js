const mongoose = require('mongoose');


const ForumKomentarShema = new mongoose.Schema({
    sadrzaj:{
        type: String,
        required: [true, 'Unesite sadržaj komentara'],
        trim: true,
        minlength: 4,
    },
    objava:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'ForumObjava' //sa kojim modelom se povezuje
    },
}, {
    timestamps: true
})


const ForumKomentar = mongoose.model('ForumKomentar', ForumKomentarShema)


module.exports = ForumKomentar 