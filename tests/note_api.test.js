const {test,after,beforeEach} = require('node:test')
const assert = require('node:assert')
const Note = require('../models/note')

const mongoose = require('mongoose')
const helper = require('../test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

/*const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        important: true,
    },
]
    */

beforeEach(async()=>{
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})

test.only('notes are returned as json', async()=>{
    await api 
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

beforeEach(async()=>{
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})

test('there are two notes',async()=>{
    const res = await api.get('/api/notes')

    assert.strictEqual(res.body.length, 2)
})
beforeEach(async()=>{
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})

test('the first note is about HTTP methods', async()=>{
    const res = await api.get ('/api/notes')

    const contents = res.body.map(e=>e.content)

    assert.strictEqual(contents.includes('HTML is easy'),true)
})

test('a valid note can be added',async()=>{
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect('Content-Type', /application\/json/)

        const res = await api.get('/api/notes')

        const contents = res.body.map(r=>r.content)

        assert.strictEqual(res.body.length, initialNotes.length + 1)

        assert((contents.includes('async/await simplifies making async calls')))
})

test.only('note without content is not added',async()=>{
    const newNote = {
        important:true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

        const res = await api.get('/api/notes')

        assert.strictEqual(res.body.length, initialNotes.length)
})

after(async()=>{
    await mongoose.connection.close()
})