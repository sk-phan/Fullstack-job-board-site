import api from "./api"

export default {
    getJobs() {
      return api.get('/jobs');
    },
    getJobByID(id) {
      return api.get('/jobs/' + id);
    },
    saveFavouriteJob(jobSeekerId, jobId) {
      return api.put('/jobs/favourite/' + jobSeekerId, {jobId})
    },
    createJob(job) {
      return api.post('/jobs/', job)
    },
    updateJob(jobId, updatedJob) {
      return api.put('/jobs/' + jobId, updatedJob)
    },
    deleteJob(jobId) {
      return api.delete('/jobs/' + jobId)
    }
  }