const mongoose = require('mongoose');
const ReceptKomentar = require('./receptKomentar');


const ReceptShema = new mongoose.Schema({
    naziv:{
        type: String,
        required: [true, 'Unesite naziv jela'],
        trim: true,
        minlength: 4,
    },
    priprema: {
        type: String,
        required: [true, 'Unesite način pripreme'],
        minlength: 4, 
    },
    opis: {
        type: String,
        required: [true, 'Unesite opis recepta'],
        minlength: 4, 
    },
   vrijemePripreme: {
       type: String,
       required: [true, 'Unesiite vrijeme pripreme'],
   },
   sastojci: [{
       sastojak: {
           type: String,
           trim: true
       }
   }],
   slika: {
    type: Buffer
    }
}, {
    //kad je sta objavljeno
    timestamps: true
})


// prije brisanja pojedinog recepta brisanje svih komentara
ReceptShema.pre('remove', async function(next){
    const recept = this
    await ReceptKomentar.deleteMany({recept: recept._id})
    next()
})


const Recept = mongoose.model('Recept', ReceptShema)


module.exports = Recept 