const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


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


    try {
        const note = await Note.findById(req.params.id)
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

    const user = await User.findById(body.userId)

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        user: user.id
    })
    console.log(note.content)
    
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.status(201).json(savedNote)

})

notesRouter.delete('/:id', async (req, res, next) => {

    await Note.findByIdAndDelete(req.params.id)
    res.status(204).json({message:"Note deleted"})

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