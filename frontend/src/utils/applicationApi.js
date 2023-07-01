import api from "./api"

export default {
    createApplication(application) {
        return api.post('/applications', application, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set the content type specifically for this request
            },
        });
    },  
    getApplicationsById(companyId) {
      return api.get('/applications/company/' + companyId)
    }  
  }