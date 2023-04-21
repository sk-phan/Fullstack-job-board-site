const jobRouter = require('express').Router()
const Job = require('../model/JobModel')
const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null

}

jobRouter.get('/', (req, res) => {
    Job.find()
    .then(job => res.json(job))
})

jobRouter.get('/:id', async (req, res, next) => {
    
    const id = await req.params.id

    Job.findById(id)
    .then(job => {

        if (job) {
            res.json(job)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))

})

jobRouter.post('/', async (req, res, next) => {
    const body = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
console.log("hej", user)
    const newJob = await new Job({
        title: body.title,
        city: body.city,
        country: body.country,
        minSalary: body.minSalary,
        maxSalary: body.maxSalary,
        jobType: body.jobType,
        companyLogo: body.companyLogo,
        createdAt: new Date().toISOString(),
        expirationDate: body.expirationDate,
        description: body.description,
        categories: body.categories,
        user: user.id
    })

    const savedJob = await newJob.save()
     user.jobs = user.jobs.concat([savedJob])
     await user.save()
    res.json( savedJob )
})

jobRouter.delete('/:id', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify( getTokenFrom(req), process.env.SECRET )
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
        }
        const jobId = req.params.id;
    
        Job.findByIdAndRemove( jobId )
        .then(() => {
            res.status(204).end()
        })
    }
    catch(err) {
        next(err)
    }

})
module.exports = jobRouter