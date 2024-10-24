const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({username})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

        
})