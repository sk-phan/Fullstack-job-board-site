const applicationRouter = require('express').Router()
const Applications = require('../model/ApplicationModel')
const Jobs = require('../model/JobModel')
const Users = require('../model/UserModel')

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
   try {
       const companyId = req.params.id
   
       const application = Applications.find({ companyId })
      
       if (application) {
           res.json(application)
       } else {
           res.status(404).end()
       }
   }
   catch(e) {
    next(e)
   }
})

//Get applications by job seeker id
applicationRouter.get('/jobSeeker/:id', async (req, res, next) => {
    try {
        const jobSeekerId = req.params.id;

        const application = await Applications.find({ jobSeekerId });

        if (application) {
            res.json(application);
        } else {
            res.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});


//Create application
applicationRouter.post('/', upload.single("file"), async (req, res, next) => {
    const body = req.body
    const jobInfo = await Jobs.findById(req.body.jobId)
    const companyInfo = await Users.findById(jobInfo.user)
    
    if (jobInfo) {

        const newApplication = await new Applications({
            name: body.name,
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
            Subject: New Job Application for - ${jobInfo.title}
    
            Dear ${companyInfo.name},
    
            I hope this email finds you well. 
            I am writing to inform you that we have received a new job application for the ${jobInfo.title} at WorkHive. The applicant's details are as follows:
           
            Applicant Name: ${body.name}
            Email Address: ${body.email}
            Phone Number: ${body.phoneNumber}
            Cover Letter: ${body.description}

            Attached to this email, you will find the applicant's CV detailing their qualifications and experience.

            We kindly request you to review the application and consider the candidate. If you have any additional questions or require further information, please don't hesitate to reach out to us.

            Thank you for your time and consideration. 
            Warm regards,
            Suki
            WorkHive
    
        `;
    
        const mailOptions = {
            from: "Suki from WorkHive <sukiphan97@gmail.com>",
            to: companyInfo.email,
            subject: "Notification",
            text: emailContent,
            attachments: [
                {
                filename: req.file.name,
                path: req.file.path,
                },
            ],
        }
    
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "sukiphan97@gmail.com",
                pass: "vsryagefwpmeglkm"
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