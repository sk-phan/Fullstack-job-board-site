<template>
    <v-container class="container pa-12 my-12">
        <div class="d-flex justify-end mt-n6 mb-4">
            <v-btn v-if="isMobile" text class="pa-0 width-0" @click=" cancel ">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <div class="d-flex justify-space-between">
            <h2 class="mb-6">Create job</h2>

            <div>
                <v-btn @click="save" class="primary mr-4"> 
                    <v-icon>mdi-content-save</v-icon>
                    Save </v-btn>
                <v-btn v-if=" !isMobile " @click=" cancel "> 
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
                    v-model="job.title"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>City</v-label>
                <v-autocomplete
                    outlined
                    flat
                    solo
                    :items = "cityList"
                    v-model="job.city"
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Country</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    disabled
                    value="Finland"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Job type</v-label>
                <v-select
                    outlined
                    solo
                    flat
                    v-model="job.jobType"
                    :items = "jobTypes"
                ></v-select>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Min salary</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model.number="job.minSalary"
                    suffix="€"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Max salary</v-label>
                <v-text-field
                    outlined
                    flat
                    solo
                    v-model.number="job.maxSalary"
                    suffix="€"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label>Categories</v-label>
                <v-select
                    outlined
                    flat
                    solo
                    v-model="job.categories"
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
                    v-model="job.description">
                </v-textarea>
            </v-col>

            <v-col cols="12">
                <v-label>Skills</v-label>
                <v-textarea 
                    outlined
                    solo
                    flat
                    v-model="job.skills"
                    rows="5">
                </v-textarea>
            </v-col>

            <v-col cols="12">
                <v-label>Benefits</v-label>
                <v-textarea 
                    outlined
                    solo
                    flat
                    v-model="job.benefits"
                    rows="5">
                </v-textarea>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import cities from '@/utils/cities';
import jobApi from '../utils/jobApi';

export default {
    name: 'EditJob',
    data() {
        return {
            cityList: cities,
            job: {
                benefits: '',
                categories: '',
                city: '',
                country: 'Finland',
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
            const newJob = {
                ...this.job,
                user: this.$store.state.user.id
            }
            jobApi
            .createJob(newJob)
            .then(res => console.log(res.data))
        },
        cancel() {
            this.$router.go(-1)
        }
    },
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        }
    },
}
</script>

<style lang="scss">
    .container {
        background: #fff;
    }
    .width-0 {
        width: 0;
        min-width: 0 !important;
    }
</style>