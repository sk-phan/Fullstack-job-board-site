<template>
    <div>
      <v-row>
        <v-col>
          <job-filter></job-filter>
        </v-col>
        <v-col v-if=" jobs.length > 0 "  md="9">
          <div v-for=" job in jobs " :key=" job.id ">
            <job-item :job=" job "></job-item>
          </div>
        </v-col>
      </v-row>
    </div>
  </template>
  

<script>
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
        }
    }
</script>