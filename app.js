const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)

app.use('/api/notes',notesRouter)