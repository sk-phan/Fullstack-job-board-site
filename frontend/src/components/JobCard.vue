<template>
    <v-row @click="goToJob" class="card pa-4 mb-10">
        <v-col>
            <v-row class="mb-4 d-flex justify-space-between">
                <div class="d-flex flex-row align-center">
                    <p class="title mb-0">{{ job.title }}</p>
                    <span class="highlight rounded px-4 ml-2">Active</span>
                </div>
            </v-row>

            <v-row>
                <v-col class="d-flex flex-row pa-0">
                    <div>
                        <span>Created {{ created }}</span>
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import dayjs from 'dayjs'
export default {
    name: "JobCard",
    props: {
        job: {
            type: Object
        }
    },
    computed: {
        created() {
            return dayjs(this.job.createdAt).fromNow()
        }
    },
    methods: {
        goToJob() {
            this.$store.commit('setCurrentJob', this.job)
            this.$router.push({ name: 'JobPosting', params: { id: this.job.id }})
        }
    },
}
</script>

<style lang="scss" scoped>
    .card {
        background: white;
        cursor: pointer;
        transition: ease-in-out 0.3s;
    }
    .card:hover {
        background: #f8f8f8;
    }

    .highlight {
        list-style: none;
        background: var(--primary-lighten);
        color: var(--primary-base);
        font-weight: 700;
    }
</style>