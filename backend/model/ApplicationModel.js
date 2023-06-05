const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const applicationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    description: String,
    file: String,
    companyId: String,
    jobSeekerId: String
})

applicationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})


module.exports = mongoose.model('Applications', applicationSchema)
