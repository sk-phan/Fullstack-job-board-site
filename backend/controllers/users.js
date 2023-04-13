const bcrypt = require('bcrypt')
const { req } = require('http')
const userRouter = require('express').Router()
const User = require('../model/UserModel')

userRouter.post('/', async (req, res) => {
  const { username, name, password, userType } = await req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    userType
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter