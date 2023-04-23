const mongoose = require('mongoose')
const jobCategories = [
    "Accounting",
    "Administration",
    "Customer Service",
    "Design",
    "Engineering",
    "Finance",
    "Healthcare",
    "Human Resources",
    "Information Technology (IT)",
    "Legal",
    "Marketing",
    "Operations",
    "Sales"
  ];

  const categoriesValidator = (categories) => {
    console.log(categories)
    const isValid = categories !== '' && jobCategories.includes(item)
    if (!isValid) {
        throw new Error('Invalid categories')
    }
  }
  
  const jobSchema = new mongoose.Schema({
    user: String,
    name: String,
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
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
    },
    categories: {
        type: String,
        require: true,
        validate: [ categoriesValidator, 'Invalid categories' ]
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