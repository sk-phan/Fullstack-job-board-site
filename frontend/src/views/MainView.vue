<template>
    <div class="my-10">
      <v-row class="mx-12">
        <v-col md="3" class="pa-0">
          <job-filter
            @filterLevel = " experienceLevel = $event "></job-filter>
        </v-col>
        <v-col v-if=" jobs.length > 0 "  md="8">
          <div v-for=" job in experienceLevelFilter " :key=" job.id ">
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
    jobs: [  ],
    experienceLevel: {
      entry: false,
      intermidate: false,
      expert: false
    },
    jobType: "fullTime",
    minSalary: 0,
    maxSalary: 5000,
    title: [  ]
  }
},
watch: {
  experienceLevel() {
    console.log(this.experienceLevel)
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
computed: {
  experienceLevelFilter() {

    const values =  Object.values(this.experienceLevel)
    const levels = values.map((v, index )=> {
      return v ? index + 1 : null
    })    

    if (values.includes(true)) {
      return this.jobs.filter(job => levels.includes(job.experienceLevel)) 
    }
    else return this.jobs
    
  }
},
created() {
  this.getJobs()
  axios.get('https://restcountries.com/v3.1/all').then(res => console.log(res.data))
}
}
</script>