<template>
    <v-row class="bg-white ma-0 px-6">
        <v-col>
            <v-col>
                <div class="d-flex flex-row justify-space-between">
                    <h2 class="mb-4">Marketing manager</h2>
                    <div>
                        <v-btn class="icon-btn pa-0 mr-4" text>
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn class="icon-btn pa-0" text>
                            <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div>
                    <p>{{ job.type }}</p>
                    <p>{{ job.responsibility }}</p>
                    <p>{{ job.benefits }}</p>
                    <p>{{ job.description }}</p>
                </div>
            </v-col>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "JobDetails",
    data() {
        return {
            job: {
                benefits: '',
                categories: '',
                city: '',
                country: '',
                description: '',
                experienceLeve: 1,
                jobType: '',
                minSalary: 0,
                maxSalary: 0,
                name: '',
                responsibility: '',
                skills: '',
                title: ''
            }
        }
    },
    created() {
        this.job = {...this.$store.state.currentJob}
        console.log(this.job)
    }
}
</script>

<style lang="scss" scoped>
    .bg-white {
        background: #fff !important;
        min-height: 100vh !important;
    }

    .icon-btn {
        min-width: 0 !important;
    }
</style>