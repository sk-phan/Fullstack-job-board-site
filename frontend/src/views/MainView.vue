<template>
    <div>
      <v-row>
        <v-col v-if=" jobs.length > 0 "  md="8">
          <div v-for=" job in jobs " :key=" job.id ">
            <job-item :job=" job "></job-item>
          </div>
        </v-col>
      </v-row>
    </div>
  </template>
  

<script>
import JobItem from '../components/JobItem.vue';
import jobApi from '../utils/jobApi';

    export default {
  components: { JobItem },
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