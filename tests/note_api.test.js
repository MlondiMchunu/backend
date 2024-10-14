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

after(async()=>{
    await mongoose.connection.close()
})