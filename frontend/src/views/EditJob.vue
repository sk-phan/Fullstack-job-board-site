<template>
    <v-container>
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
            ]
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

<style>

</style>