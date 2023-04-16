const bcrypt = require('bcrypt')
const { req } = require('http')
const userRouter = require('express').Router()
const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

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

userRouter.get('/user/:id', async (req, res) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  } else {

    const id = req.params.id
  
    User.findById(id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
  }

})
module.exports = userRouter