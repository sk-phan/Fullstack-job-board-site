const applicationRouter = require('express').Router()
const Applications = require('../model/ApplicationModel')

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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

    // Compose email content
    const emailContent = `
        Dear ${body.firstName},

        Thank you for providing your information. We have received the following details:

        Name: ${body.firstName}
        Email: hongnhung19121997@gmail.com

        We will get back to you soon.

        Regards,
        Your Company
    `;

    const mailOptions = {
        from: "WorkHive <hongnhung19121997@gmail.com>",
        to: "hongnhung19121997@gmail.com",
        subject: "Notification",
        text: emailContent
    }

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sukiphan97@gmail.com",
            pass: "lrmpbvkxswjmsjnl"
        }
    })

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
})





module.exports = applicationRouter