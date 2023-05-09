<template>
    <div class="my-10">
      <v-row class="mx-12">
        <v-col md="3" class="pa-0">
          <job-filter
            @filterLevel = " experienceLevel = $event "
            @filterJobType = " jobTypes = $event "
            @filterCategories = " jobCategories = $event ">
          </job-filter>
        </v-col>
        <v-col v-if=" jobs.length > 0 "  md="8">
          <div v-for=" job in jobCategoriesFilter " :key=" job.id ">
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
    jobTypes: {
      fullTime: false,
      partTime: false
    },
    jobCategories: {
      "Accounting": false,
      "Administration": false,
      "Customer Service": false,
      "Design": false,
      "Engineering": false,
      "Finance": false,
      "Healthcare": false,
      "Human Resources": false,
      "Information Technology (IT)": false,
      "Legal": false,
      "Marketing": false,
      "Operations": false,
      "Sales": false
    },
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
    
  },
  jobTypeFilter() {
    const values = Object.keys( this.jobTypes ).filter(v => this.jobTypes[v])

    if (values.length > 0) {
      return this.experienceLevelFilter.filter(job => values.includes(job.jobType))
    }
    else return this.experienceLevelFilter
  },
  jobCategoriesFilter() {
    const keys = Object.keys( this.jobCategories )
    const selectedItems = keys.filter(v => this.jobCategories[v])

    if (selectedItems.length > 0) {
        return this.jobTypeFilter.filter(job => this.jobCategories[ job.categories ])
    }
    else return this.jobTypeFilter
  }
},
created() {
  this.getJobs()
  axios.get('https://restcountries.com/v3.1/all').then(res => console.log(res.data))
}
}
</script>