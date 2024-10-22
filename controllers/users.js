const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('./models/user')

usersRouter.post('/',async(req,res)=>{
    const {username, name, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
})