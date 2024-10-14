const notesRouter = require('express').Router()
const Note = require('../models/note')


//callback
/*notesRouter.get('/',(req,res)=>{
   Note.find({}).then(notes => {
        res.json(notes)
    })
})
    */

//promise 
notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})
    res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {

    const note = await Note.findById(req.params.id)

    try {
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    }
    catch (exception) {
        next(exception)
    }
})

notesRouter.post('/', async (req, res, next) => {
    const body = req.body

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    //use try catch for error handling in async await
    try {
        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }

})

notesRouter.delete('/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important,
    }
    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter