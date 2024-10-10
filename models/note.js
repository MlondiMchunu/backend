const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

require('dotenv').config();
const url = process.env.MONGODB_URI;

console.log('connectiong to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongoDB');
    })
    .catch(error => {
        console.log('error connectiong to mongodb')
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

