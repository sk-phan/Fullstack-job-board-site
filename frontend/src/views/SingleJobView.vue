<template>
    <v-container class="pa-12">
        <v-row>
            <v-col class="bg pa-12">
                <v-row>
                    <v-col class="pl-0">
                        <h2>{{ job.title }}</h2>
                    </v-col>
                    <v-col class="d-flex justify-end">
                        <v-btn text>
                            <v-icon>mdi-cards-heart-outline</v-icon>
                        </v-btn>
                        <v-btn color="primary" depressed>Apply</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-6 mb-12">
                    <span class="tag mr-3">{{ job.jobType }}</span>
                    <span class="tag">{{ job.city }}, {{ job.country }}</span>
                </v-row>
                <v-row>
                    <p>{{ job.description }}</p>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import jobApi from '@/utils/jobApi';

export default {
    name: 'SingleJobView',
    data() {
        return {
            jobId: this.$route.params.id,
            job: {
                title: "",
                description: ""
            }
        }
    },
    created() {
        jobApi.getJobByID(this.jobId)
        .then(res => {
            if (res.data) {
                this.job = {...res.data}
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .bg {
        background: #fff !important;
    }
    .tag {
        background: var(--primary-lighten);
        color: var(--primary-base);
        padding: 2px 8px;
        border-radius: 10px;
    }
</style>