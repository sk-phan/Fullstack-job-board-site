<template>
    <v-container class="my-10 pa-6 container">
        <div>
            <h2 class="text-primary mb-10 pa-0 ml-0">Posted jobs</h2>
        </div>
        <div v-if=" user.jobs.length > 0 ">
            <div v-for=" job in user.jobs " :key=" job.id ">
                <job-card :job=" job "></job-card>
            </div>
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
            }
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
</style>