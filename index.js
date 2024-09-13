//const http = require('http')

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

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

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).send('Note not found')
    }
})

/**Deleting Resources!! */
app.delete('/api/notes/:id',(req,res)=>{
    const id = req.params.id
    const note = notes.filter(note=> note.id === id)

    res.status(204).send(`Note ${note} deleted`)
})

/**Adding Data to Server */
app.use(express.json())

const generatedId =()=>{
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
}

app.post('./api/notes',(req,res)=>{
    const body = req.body

    if(!body.content){
        return res.status(400).json({
            error:'content missing'
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generatedId(),
    }
 
    notes = notes.concat(note)

    //console.log(note)
    
    res.json(note)
})


const PORT = process.env.PORT || 3002
//app.listen(PORT)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
