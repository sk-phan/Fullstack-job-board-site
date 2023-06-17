<template>
    <v-container class="my-10">
        <div v-if=" user.jobs.length > 0 ">
            <div v-for=" job in user.jobs " :key=" job.id ">
                <job-card :job=" job "></job-card>
            </div>
        </div>
    </v-container>
</template>

<script>
import JobCard from '@/components/JobCard.vue'

export default {
    name: "MyJobs",
    components: { JobCard},
    data() {
        return {
            user: {
                jobs: []
            }
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem('user'))
    }
}
</script>