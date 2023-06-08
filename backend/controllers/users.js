const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const Job = require('../model/JobModel')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

userRouter.post('/', async (req, res) => {
  const { email, name, password, userType, introduction } = await req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    email,
    name,
    passwordHash,
    userType,
    introduction
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

userRouter.get('/:id', async (req, res, next) => {

  try {

    const decodedToken = jwt.verify(await getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const id = req.params.id
    const user = await User.findById(id)
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    res.json(user)

  }
  catch(err) {
    next(err)
  }

})

userRouter.put('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(await getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const id = req.params.id
    const user = await User.findById(id)

    //If user id is invalid
    if (!user) {
      return res.status(404);
    }

    //Update user
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true, context: 'query' }
    )

    await Job.updateMany({  user: id },{ $set: { name: updatedUser.name } })
    
    res.json(updatedUser)
  }
  catch(err) {
    next(err)
  }

})

userRouter.put('/updateApplication/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(await getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const id = req.params.id //company id
    const user = await User.findById(id)

    //If user id is invalid
    if (!user) {
      return res.status(404);
    }

    else if (user && user.type === 1) {

      const companyProfile = {
        ...user,
        applications: [...applications ,req.body]
      } 
  
      //Update user
      const updatedUser = await User.findByIdAndUpdate(
        id, 
        companyProfile, 
        { new: true, runValidators: true, context: 'query' }
      )
      
      res.json(updatedUser)
    }
  }
  catch(err) {
    next(err)
  }

})

userRouter.delete('/:id', async (req, res, next) => {
  
  try {
    const decodedToken =  await jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const id = req.params.id
    const user = await User.findByIdAndDelete(id)
    
    if (!user) {
      return res.status(404)
    }
    res.status(204).end()

  }
  catch(err) {
    next(err)
  }


})
module.exports = userRouter