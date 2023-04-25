const mongoose = require('mongoose');
const Job = require('./model/JobModel');


mongoose.connect('mongodb+srv://sukiphan97:Hongnhung1912@cluster0.kn1fqop.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Job.updateMany({}, { $set: { experienceLevel: '1' } })
  .then(result => {
    console.log(`${result.nModified} documents updated.`);
    mongoose.connection.close();
  })
  .catch(error => console.error('Error updating documents:', error));