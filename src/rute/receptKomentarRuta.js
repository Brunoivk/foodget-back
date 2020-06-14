const express = require('express');
const ReceptKomentar = require('../db/models/receptKomentar.js');


var ReceptKomentarRuta = new express.Router()

ReceptKomentarRuta.post('/api/recept_komentar', async (req, res) =>{
    var receptKomentar = new ReceptKomentar({
        ...req.body,
    })
    try {
        await receptKomentar.save()
        res.status(200).send(receptKomentar)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})


// ReceptKomentarRuta.patch('/api/recept_komentar/:id', async (req, res) =>{
//     console.log("patch recept komentar");
//     const updates = Object.keys(req.body)
//     const dozvoljenePromjene = ["sadrzaj"];
//     const smijeLiSePromjeniti = updates.every((promjena) =>{
//         return dozvoljenePromjene.includes(promjena)
//     })
//     if(!smijeLiSePromjeniti){
//         return res.status(400).send()
//     }
//     try {
//         const komentar = await ReceptKomentar.findOne({_id:req.params.id})
//         updates.forEach((promjena) => komentar[promjena] = req.body[promjena])
        
//         await komentar.save()
//         if(!komentar){
//             return res.status(404).send()
//         }
//         res.send(komentar)
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

ReceptKomentarRuta.delete('/api/recept_komentar/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentar = await ReceptKomentar.findOneAndDelete({_id})
        if(!komentar){
            return res.status(404).send()
        }
        res.send(komentar)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ReceptKomentarRuta