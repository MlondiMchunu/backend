const {test,after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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