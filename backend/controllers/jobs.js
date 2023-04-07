const jobRouter = require('express').Router()
const Job = require('../model/JobModel')

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
 
    const newJob = await new Job({
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        minSalary: req.body.minSalary,
        maxSalary: req.body.maxSalary,
        jobType: req.body.jobType,
        companyLogo: req.body.companyLogo,
        createdAt: new Date().toISOString(),
        expirationDate: req.body.expirationDate,
        description: req.body.description
    })

    newJob.save()
    .then(savedJob => {
        res.json( savedJob )
    })
    .catch(error => next(error))
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