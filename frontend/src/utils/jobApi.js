import api from "./api"

export default {
    getJobs() {
      return api.get('/jobs');
    },
  }