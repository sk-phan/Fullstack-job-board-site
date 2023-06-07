const applicationRouter = require('express').Router()
const Applications = require('../model/ApplicationModel')
const Jobs = require('../model/JobModel')

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
    const jobInfo = await Jobs.findById(req.body.jobId)

    if (jobInfo) {

        const newApplication = await new Applications({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            description: body.description,
            file: req.file.originalname,
            jobId: req.body.jobId,
            companyId: jobInfo.user,
            jobSeekerId: body.jobSeekerId
        })
    
        const savedApplication = await newApplication.save()
        res.json( savedApplication )
    
        // Compose email content
        const emailContent = `
            Subject: Application Forwarded - ${jobInfo.title}
    
            Dear ${body.firstName},
    
            Thank you for applying to the position of [Position Title] through our job board. We want to inform you that your application has been successfully forwarded to the hiring company. We appreciate your interest in this opportunity and the effort you put into your application.
    
            Here are the details of your application:
            - Full Name: ${body.firstName + ' ' + body.lastName}
            - Email Address: ${body.email}
            - Phone Number: ${body.phoneNumber}
            - Position: ${jobInfo.title}
            - Application Date: ${new Date().toLocaleDateString()}
    
            Please note that this email serves as confirmation that your application has been received and forwarded. The hiring company will now review your application and consider your qualifications and experience. If your profile matches their requirements, they may contact you directly for further steps in the selection process.
    
            We kindly request your patience as the hiring process takes place. Each company has its own timeline and procedures for reviewing applications. Rest assured that your application will be given due consideration.
    
            If you have any questions or need further assistance, please do not hesitate to contact us at sukiphan97@gmail.com. We are here to support you throughout your job search.
    
            Thank you again for using our job board and best of luck with your application. We hope you find success in your career endeavors.
    
            Warm regards,
            Suki
            WorkHive
    
        `;
    
        const mailOptions = {
            from: "Suki from WorkHive <hongnhung19121997@gmail.com>",
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
    }
})





module.exports = applicationRouter