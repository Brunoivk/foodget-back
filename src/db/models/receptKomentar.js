const mongoose = require('mongoose');


const ReceptKomentarShema = new mongoose.Schema({
    sadrzaj:{
        type: String,
        required: [true, 'Unesite sadržaj komentara'],
        trim: true,
        minlength: 4,
    },
    recept:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Recept' //sa kojim modelom se povezuje
    },
}, {
    timestamps: true
})


const ReceptKomentar = mongoose.model('ReceptKomentar', ReceptKomentarShema)


module.exports = ReceptKomentar 