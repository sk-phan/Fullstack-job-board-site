<template>
    <v-container class="container pa-12 my-12">
        <div class="d-flex justify-space-between">
            <h2 class="mb-6">Edit job {{ editedJob.name }}</h2>

            <div>
                <v-btn @click="save" class="primary mr-4"> 
                    <v-icon>mdi-content-save</v-icon>
                    Save </v-btn>
                <v-btn @click=" cancel "> 
                    <v-icon>mdi-close</v-icon>
                    Cancel 
                </v-btn>
            </div>
        </div>
        <v-row>
            <v-col cols="12" md="4">
                <v-label>Title</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model="editedJob.name"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>City</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model="editedJob.city"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Country</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model="editedJob.country"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Job type</v-label>
                <v-select
                    outlined
                    solo
                    flat
                    v-model="editedJob.jobType"
                    :items = "jobTypes"
                ></v-select>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Min salary</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model.number="editedJob.minSalary"
                    suffix="€"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Max salary</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model.number="editedJob.maxSalary"
                    suffix="€"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Categories</v-label>
                <v-select
                    outlined
                    flat
                    solo
                    v-model="editedJob.categories"
                    :items="categories">
                </v-select>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-label>Description</v-label>
                <v-textarea 
                    outlined
                    solo
                    flat
                    rows="5"
                    v-model="editedJob.description">
                </v-textarea>
            </v-col>

            <v-col cols="12">
                <v-label>Skills</v-label>
                <v-textarea 
                    outlined
                    solo
                    flat
                    v-model="editedJob.skills"
                    rows="5">
                </v-textarea>
            </v-col>

            <v-col cols="12">
                <v-label>Benefits</v-label>
                <v-textarea 
                    outlined
                    solo
                    flat
                    v-model="editedJob.benefits"
                    rows="5">
                </v-textarea>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import jobApi from '../utils/jobApi';
export default {
    name: 'EditJob',
    data() {
        return {
            editedJob: {
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
            },
            jobTypes: [
                {
                    text: 'Full-time',
                    value: 'fullTime'
                },
                {
                    text: 'Part-time',
                    value: 'partTime'
                }
            ],
            categories: [
                {
                    text:"Accounting",
                    value: "Accounting"
                },
                {
                    text:"Administration",
                    value: "Administration"
                },
                {
                    text:"Customer Service",
                    value: "Customer Service"
                },
                {
                    text:"Design",
                    value: "Design"
                },
                {
                    text:"Engineering",
                    value: "Engineering"
                },
                {
                    text:"Finance",
                    value: "Finance"
                },
                {
                    text:"Healthcare",
                    value: "Healthcare"
                },
                {
                    text:"Human Resources",
                    value: "Human Resources"
                },
                {
                    text:"Information Technology (IT)",
                    value: "Information Technology (IT)"
                },
                {
                    text:"Legal",
                    value: "Legal"
                },
                {
                    text:"Marketing",
                    value: "Marketing"
                },
                {
                    text:"Operations",
                    value: "Operations"
                },
                {
                    text:"Sales",
                    value: "Sales"
                }
            ]
        }
    },
    methods: {
        save() {
            jobApi
            .updateJob(this.editedJob.id, this.editedJob)
            .then(res => console.log(res.data))
        },
        cancel() {
            this.$router.go(-1)
        }
    },
    created() {
        const jobId = this.$route.params.id;

        if (jobId) {
            jobApi.getJobByID(jobId)
            .then(res => {
                if (res.data) {
                    this.editedJob = {...res.data}
                }
            })
            .catch(e => console.log(e))
        }
    }
}
</script>

<style lang="scss">
    .container {
        background: #fff;
    }
</style>