<template>
    <div>
      <v-row class="mx-12">
        <v-col md="3">
          <job-filter></job-filter>
        </v-col>
        <v-col v-if=" jobs.length > 0 "  md="8">
          <div v-for=" job in jobs " :key=" job.id ">
            <job-item :job=" job "></job-item>
          </div>
        </v-col>
      </v-row>
    </div>
  </template>
  

<script>
import axios from 'axios';
import JobFilter from '../components/JobFilter.vue';
import JobItem from '../components/JobItem.vue';
import jobApi from '../utils/jobApi';

export default {
components: { JobItem, JobFilter },
name: 'MainView',
data() {
  return {
    jobs: []
  }
},
methods: {
  getJobs() {
    jobApi
    .getJobs()
    .then(res => this.jobs = [...res.data])
    .catch(error => console.log(error))
  }
},
created() {
  this.getJobs()
  axios.get('https://restcountries.com/v3.1/all').then(res => console.log(res.data))
}
}
</script>