const {test,after,beforeEach} = require('node:test')
const Note = require('../models/note')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        important: true,
    },
]

beforeEach(async()=>{
    await Note.deleteMany({})
    let noteObject = new Note(initialNotes[0])
    await noteObject.save()
    noteObject = new Note(initialNotes[1])
    await noteObject.save()
})

test('notes are returned as json', async()=>{
    await api 
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two notes',async()=>{
    const res = await api.get('/api/notes')

    assert.strictEqual(res.body.length, 2)
})

test('the first note is about HTTP methods', async()=>{
    const res = await api.get ('/api/notes')

    const contents = res.body.map(e=>e.content)

    assert.strictEqual(contents.includes('HTML is easy'),true)
})

after(async()=>{
    await mongoose.connection.close()
})