const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mlondiemchunu1:${password}@cluster0.oveo9.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note',noteSchema)

const note = new Note({
    content: 'I love MERN',
    important:true,
})

/*Note.find({}).then(result =>{
    result.forEach(note =>{
        console.log(note)
    })
})*/

note.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})
