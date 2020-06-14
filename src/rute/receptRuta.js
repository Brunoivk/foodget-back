const express = require('express');
const Recept = require('../db/models/recept.js');
const ReceptKomentar = require('../db/models/receptKomentar.js');
const multer = require('multer')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb(new Error('Učitajte sliku'))
        }

        cb(undefined, true)
    }
})


//posto su rute podjeljene u vise fileova, u svakome treba instancirati novu
var ReceptRuta = new express.Router()


ReceptRuta.post('/api/recept', async (req, res) =>{
       
    //stvara novi recept 
    var recept = new Recept({
        ...req.body,
    })
    try {
       
        await recept.save()
        res.status(200).send(recept)
    } catch (error) {
        
        res.status(500).send({error: error.message})
    }
})
ReceptRuta.post('/api/recept/:id/slika', upload.single('slika'), async (req, res) =>{
    var slika
    //provjerava da li je slika uploadana
    if(req.file === undefined) {
        slika = ''
    } else{
        slika = req.file.buffer
    }

    try {
        console.log("dasdasdadsd");
        const recept = await Recept.findById(req.params.id)
        if(!recept){
            return res.status(404).send({error: "Recept ne postoji"})
        }
        recept.slika = slika
        await recept.save()
        res.status(200).send(recept)
    } catch (error) {
        
        res.status(500).send({error: error.message})
    }
})

//dohvaca sve recepte

ReceptRuta.get('/api/recept', async (req, res) =>{
    const match = {}
    
    if(req.query.naziv != null){
        let termin = new RegExp(`^.*${req.query.naziv}.*$`, "img")
        match['naziv'] = termin
    }
    
    try {
        //pokusava dohvatit sve po tome
        var recepti = await Recept.find(match, null);
        if(recepti.length === 0) return res.status(404).send("Nema recepata")
        res.send({recepti})
    } catch (error) {
        res.status(500).send(error)
    }
})

// dohvacanje slike za pojedini recept
ReceptRuta.get('/api/recept/:id/slika', async (req, res) => {
    try {
        const recept = await Recept.findById(req.params.id)

        if (!recept || !recept.slika) {
            throw new Error("error sa slikom")
        }

        res.set('Content-Type', 'image/jpg')
        res.send(recept.slika)
    } catch (e) {
        res.status(404).send()
    }
})

//dohvati jedan recept po id
ReceptRuta.get('/api/recept/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const recept = await Recept.findOne({_id});
        if(!recept){
            return res.status(404).send({error: "Recept ne postoji"})
        }
        res.send(recept)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//dohvaca sve komentare za taj recept
ReceptRuta.get('/api/recept/:id/komentari', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentari = await ReceptKomentar.find({recept: _id});
        if(!komentari){
            return res.status(404).send({error: "Recept ne postoji"})
        }
        res.send(komentari)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//updejt jednog recepta
ReceptRuta.patch('/api/recept/:id', async (req, res) =>{
    console.log("patch", req.body);
   
    const updates = Object.keys(req.body)

    const dozvoljenePromjene = ["naziv", "opis", "sastojci", "priprema", "vrijemePripreme"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    if(!smijeLiSePromjeniti){
        return res.status(400)
    }
    try {
        
        const recept = await Recept.findOne({_id:req.params.id})
        updates.forEach((promjena) => recept[promjena] = req.body[promjena])
        
        await recept.save()
        if(!recept){
            return res.status(404).send()
        }
        res.send(recept)
    } catch (error) {
        res.status(400).send(error)
    }
})

//nade recept po id-ju i obrise ga
ReceptRuta.delete('/api/recept/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const recept = await Recept.findOne({_id})
        if(!recept){
            return res.status(404).send()
        }
        await recept.remove()
        res.send(recept)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ReceptRuta