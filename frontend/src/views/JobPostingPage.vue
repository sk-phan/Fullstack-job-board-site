<template>
    <v-container>
        <!-- <v-tabs>
            <v-tab :value="1" @change=" tab = 1 ">Job details</v-tab>
            <v-tab :value="2" @change=" tab = 2 ">Applications</v-tab>
        </v-tabs> -->

        <job-details :id = "jobId"></job-details>
        <!-- <application-list v-else></application-list> -->
        
    </v-container>
</template>

<script>
// import ApplicationList from '../components/ApplicationList.vue'

import JobDetails from '../components/JobDetails.vue'
export default {
    components: { JobDetails },
    name: "JobPostingPage",
    data() {
        return {
            tab: 1,
            jobId: this.$route.params.id
        }
    }
}
</script>