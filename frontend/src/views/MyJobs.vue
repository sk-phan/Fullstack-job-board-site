<template>
    <v-container class="my-10 pa-6 container">
        <div class="d-flex justify-space-between">
            <h2 class="text-primary mb-10 pa-0 ml-0">Posted jobs ({{ user.jobs.length }})</h2>
            <v-btn @click="createJob" color="black text-white">
                <v-icon small>mdi-plus</v-icon>
                Create job
            </v-btn>
        </div>
        <div v-if=" user.jobs.length > 0 ">
            <div v-for=" job in user.jobs " :key=" job.id ">
                <job-card :job=" job "></job-card>
            </div>
        </div>

        <div v-else class="d-flex flex-column align-center justify-center">
            <img src="@/assets/noData.png" width="30%" />
            <p class="text-center">
                Oops, it seems like there haven't been any new job postings recently. 
                <br/>
                Why not create a new job listing and discover talented candidates to fill the position?
            </p>
        </div>
    </v-container>
</template>

<script>
import JobCard from '@/components/JobCard.vue'
import userApi from '@/utils/userApi'

export default {
    name: "MyJobs",
    components: { JobCard},
    data() {
        return {
            user: {
                jobs: []
            },
        }
    },
    methods: {
        async getUser() {
            const id = await localStorage.getItem('userId')
            userApi
            .getUser(id)
            .then(res => { 
                this.user = {...res.data}
            })
            .catch(error => console.log(error))
        },
        createJob() {
            this.$router.push("/newJob")
        }
    },
    created() {
        this.getUser()
    }
}
</script>

<style lang="scss" scoped>
.container {
    background: transparent;
}

.text-center {
    text-align: center;
}
</style>