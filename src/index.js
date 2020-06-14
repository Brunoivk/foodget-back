const express = require('express');
const cors = require('cors');
require('./db/baza')

//importanje ruta 
const ReceptRuta = require('./rute/receptRuta');
const ReceptKomentarRuta = require('./rute/receptKomentarRuta');
const ForumObjavaRuta = require('./rute/forumObjavaRuta');
const ForumKomentarRuta = require('./rute/forumKomentarRuta');


// instanciranje aplikacije
const app  = express()

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

//koristenje importanih ruta
app.use(ReceptRuta)
app.use(ReceptKomentarRuta)
app.use(ForumObjavaRuta)
app.use(ForumKomentarRuta)


app.listen(port, () =>{
    console.log(`Server je na portu ${port}`);
})