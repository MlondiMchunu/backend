//const http = require('http')
require('dotenv').config()
const Note = require('./models/note')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('dist'))

//adding data to server
app.use(express.json())
//app.use(requestLogger)

const password = process.argv[2]



const PORT = process.env.PORT || 3002

let notes = [
    {
        id: '1',
        content: 'HTML is easy',
        important: true
    },
    {
        id: '2',
        content: 'Browser can execute only Javascript',
        important: false
    },
    {
        id: '3',
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }, {
        id: '4',
        content: 'This is to test Render commit DEploys',
        important: true
    }
]

/*const app = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'application/json'})
    res.end(JSON.stringify(notes))

})
*/

/** Fetching Resources */
app.get('/', (req, res) => {
    res.send('<h4>Hello from Server!!</h4>')
})


/*
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).send('Note not found')
    }
})*/

/**Deleting Resources!! */
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.filter(note => note.id === id)

    res.status(204).send(`Note ${note} deleted`)
})


const generatedId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
}
//this is postman code
/*app.post('./api/notes',(req,res)=>{
    const body = req.body

    if(!body.content){
        return res.status(400).json({
            error:'content missing'
        })
    }*/

app.post('/api/notes', (req, res,next) => {
    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        res.json(savedNote)
    })
    .catch(error=>next(error))
})

app.get('/api/notes',(req,res)=>{
    Note.find({})
        .then(note=>{
            if(note){
                res.json(note)
            }else{
                res.status(404).end()
            }
        })
        .catch(error =>next(error))
})



app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id',(req,res,next)=>{
    //const body = req.body
    const {content, important} = req.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(
        req.params.id,
        {content,important},
        {new:true, runValidators: true, context: 'query'})
        
        .then(updatedNote=>{
            res.json(updatedNote)
        })
        .catch(error=>next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }else if(error.name === 'ValidationError'){
        return res.status(400).json({error:error.message})
    }
    next(error)
}

//error handling middlerware has to be the last loaded middleware
app.use(errorHandler)



//another postman code
/* const note = {
     content: body.content,
     important: Boolean(body.important) || false,
     id: generatedId(),
 }
 
 notes = notes.concat(note)

 //console.log(note)
 
 res.json(note)
})*/

//app.listen(PORT)

app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`)
    logger.info(`Server running on port ${config.PORT}`)
})
