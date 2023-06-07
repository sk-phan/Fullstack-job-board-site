const applicationRouter = require('express').Router()
const Applications = require('../model/ApplicationModel')
const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')
const multer = require('multer');

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Set the destination folder where the files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original file name for saving
    },
});


// Create the multer upload instance
const upload = multer({ storage });

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
    }
    return null

}

applicationRouter.get('/', (req, res) => {
    Applications.find()
    .then(application => res.json(application))
})

applicationRouter.get('/:id', async (req, res, next) => {
    
    const id = await req.params.id

    Applications.findById(id)
    .then(application => {

        if (application) {
            res.json(application)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))

})

//Get applications by company id
applicationRouter.get('/company/:id', async (req, res, next) => {
    const companyId = req.params.id

    Applications.find({ companyId })
    .then(application => {
        if (application) {
            res.json(application)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

//Get applications by job seeker id
applicationRouter.get('/jobSeeker/:id', async (req, res, next) => {
    const jobSeekerId = req.params.id

    Applications.find({ jobSeekerId })
    .then(application => {
        if (application) {
            res.json(application)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

//Create application
applicationRouter.post('/', upload.single("file"), async (req, res, next) => {
    const body = req.body
    
    const newApplication = await new Applications({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        description: body.description,
        file: req.file.originalname,
        companyId: body.companyId,
        jobSeekerId: body.jobSeekerId
    })

    const savedApplication = await newApplication.save()
    res.json( savedApplication )
})





module.exports = applicationRouter