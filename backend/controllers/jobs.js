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
        user: user.id,
        name: user.name
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
        const job = await Job.findById(jobId)
    
        if (job) {

            const user = await User.findById(job.user)
            user.jobs = user.jobs.filter(i => i.id !== jobId)
            await user.save()
        }

        Job.findByIdAndRemove( jobId )
        .then(() => {
            res.status(204).end()
        })

    }
    catch(err) {
        next(err)
    }

})

jobRouter.put('/:id', async (req, res, next) => {
    console.log(req.body)
    try {
        const decodedToken = jwt.verify( getTokenFrom(req), process.env.SECRET )
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
        }
        const jobId = req.params.id
        const job = await Job.findById(jobId)

        //If user id is invalid
        if (!job) {
            return res.status(404);
        }
        const updateJob = await Job.findByIdAndUpdate(
            jobId,
            req.body,
            { new: true, runValidators: true, context: 'query' }
        )
        res.json(updateJob)
    }
    catch(err) {
        next(err)
    }
})
module.exports = jobRouter