<template>
    <v-row class="bg-white ma-0 px-6">
        <v-col>
            <v-col>
                <div class="d-flex flex-row justify-space-between">
                    <h2 class="mb-4">{{ job.title }}</h2>
                    <div>
                        <v-btn @click="editJob" class="icon-btn pa-0 mr-4" text>
                            <v-icon>mdi-pencil-outline</v-icon> Edit
                        </v-btn>
                        <v-btn @click="deleteJob" class="icon-btn pa-0" text>
                            <v-icon>mdi-delete-outline</v-icon> Delete
                        </v-btn>
                    </div>
                </div>
                <div>
                    <v-row class="ma-0">
                        <p>{{ job.description }}</p>
                    </v-row>

                    <v-row class="ma-0">
                        <v-col>
                            <v-row class="title-2 mb-2">Responsibility</v-row>
                            <v-row>
                                <p class="responsibility-text">
                                    {{ job.responsibility }}
                                </p>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="ma-0">
                        <v-col>
                            <v-row class="title-2 mb-2">Skills</v-row>
                            <v-row>
                                <p class="responsibility-text">
                                    {{ job.skills }}
                                </p>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row class="ma-0">
                        <v-col>
                            <v-row class="title-2 mb-2">Benefits</v-row>
                            <v-row>
                                <p class="responsibility-text">
                                    {{ job.benefits }}
                                </p>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-col>

        <delete-job-dialog
            :visible=" openDeleteDialog "
            :name = " job.name "
            @confirm = " confirmDelete ">
        </delete-job-dialog>
    </v-row>
</template>

<script>
import jobApi from '../utils/jobApi'
import DeleteJobDialog from './DeleteJobDialog.vue'

export default {
  components: { DeleteJobDialog },
    name: "JobDetails",
    props: {
        id: {
            type: String
        }
    },
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
                title: '',
            },
            openDeleteDialog: false,
        }
    },
    methods: {
        editJob() {
            this.$router.push({ name: 'EditJob', params: { id: this.id }})
        },
        deleteJob() {
            this.openDeleteDialog = true
        },
        confirmDelete( confirm ) {
            if (confirm) {
                jobApi
                .deleteJob(this.id)
                .then(res => {
                    if (res.status === 204) {
                        this.$router.push("/myJobs")
                    }
                })
            }
            else {
                this.openDeleteDialog = false;
            }
        }
    },
    created() {

        if (this.id) {
            jobApi.getJobByID(this.id)
            .then(res => {
                if (res.data) {
                    this.job = {...res.data}
                    console.log(this.job)
                }
            })
            .catch(e => console.log(e))
        }
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