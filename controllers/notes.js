const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/',(req,res)=>{
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

notesRouter.get('/:id',(req,res,next)=>{
    Note.findById(req.params.id)
        .then(note =>{
            if(note){
                res.json(note)
            }else{
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})