const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Job = require('./JobModel')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    passwordHash: String,
    userType: Number, // 1 = Company, 2 = Job seeker,
    introduction: String,
    jobs: [Job.schema],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User