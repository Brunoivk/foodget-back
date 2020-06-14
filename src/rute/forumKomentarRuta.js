const express = require('express');
const ForumKomentar = require('../db/models/forumKomentar.js');


var ForumKomentarRuta = new express.Router()

ForumKomentarRuta.post('/api/forum_komentar', async (req, res) =>{
    var forumKomentar = new ForumKomentar({
        ...req.body,
    })
    try {
        await forumKomentar.save()
        res.status(200).send(forumKomentar)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})


ForumKomentarRuta.patch('/api/forum_komentar/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const dozvoljenePromjene = ["sadrzaj"];
    const smijeLiSePromjeniti = updates.every((promjena) =>{
        return dozvoljenePromjene.includes(promjena)
    })
    if(!smijeLiSePromjeniti){
        return res.status(400).send()
    }
    try {
        const komentar = await ForumKomentar.findOne({_id:req.params.id})
        updates.forEach((promjena) => komentar[promjena] = req.body[promjena])
        
        await komentar.save()
        if(!komentar){
            return res.status(404).send()
        }
        res.send(komentar)
    } catch (error) {
        res.status(400).send(error)
    }
})

ForumKomentarRuta.delete('/api/forum_komentar/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const komentar = await ForumKomentar.findOneAndDelete({_id})
        if(!komentar){
            return res.status(404).send()
        }
        res.send(komentar)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = ForumKomentarRuta