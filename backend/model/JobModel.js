const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    user: String,
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    location: {
        type: String,
        minLength: 5,
        required: true
    },
    minSalary: {
      type: Number,   
    },
    maxSalary: {
        type: Number
    },
    jobType: {
        type: String,
        required: true
    },
    companyLogo: {
        type: String,
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString()
    },
    expirationDate: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    }
    
})

jobSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Job', jobSchema)