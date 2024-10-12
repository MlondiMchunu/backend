//require('dotenv').config()
const mongoose = require('mongoose')

//mongoose.set('strictQuery', false)
//do not save password to github
//const url = process.env.MONGODB_URI;
//console.log('connectiong to', url)
/*mongoose.connect(url)
    .then(result => {
        console.log('connected to mongoDB');
    })
    .catch(error => {
        console.log('error connectiong to mongodb')
    })
*/

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON',{
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
