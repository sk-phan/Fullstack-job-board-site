const jobRouter = require('express').Router()
const Job = require('../model/JobModel')
const User = require('../model/UserModel')

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
    const user = await User.findById(req.body.user)
    console.log(req.body.user)

    const newJob = await new Job({
        title: req.body.title,
        location: req.body.location,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        jobType: req.body.jobType,
        companyLogo: req.body.companyLogo,
        createdAt: new Date().toISOString(),
        expirationDate: req.body.expirationDate,
        description: req.body.description,
        user: user.id
    })

    const savedJob = await newJob.save()
    user.jobs = user.jobs.concat(savedJob)
    await user.save()
    res.json( savedJob )
})

jobRouter.delete('/:id', async (req, res, next) => {
    const jobId = req.params.id;

    Job.findByIdAndRemove( jobId )
    .then(() => {
        res.status(204).end()
    })
    .catch(error => next(error))

})
module.exports = jobRouter