const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mlondiemchunu1:Maxingwane12@cluster0.oveo9.mongodb.net/`