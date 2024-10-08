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

/*const note = new Note({
    content: 'This is a fourth note',
    important: true,
})
*/
Note.find({}).then(result =>{ //will get all the notes as parameter is an empty object
    result.forEach(note =>{
        console.log(note)
    })
    mongoose.connection.close()
})

/*note.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})
*/
