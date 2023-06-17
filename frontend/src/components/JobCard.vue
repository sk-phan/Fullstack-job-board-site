<template>
    <v-row class="card pa-4 mb-10">
        <v-col>
            <v-row class="mb-4">
                <div class="d-flex flex-row align-center">
                    <p class="title mb-0">{{ job.title }}</p>
                    <span class="highlight rounded px-4 ml-2">Active</span>
                </div>
            </v-row>

            <v-row>
                <v-col class="d-flex flex-row pa-0">
                    <div class="d-flex">
                        <v-icon class="mr-2" small>mdi-clipboard-account-outline</v-icon>
                        <span>{{ job.jobSeekerIds.length }} applied</span>
                    </div>

                    <v-icon>mdi-circle-small</v-icon>

                    <div class=" d-flex">
                        <v-icon class="pa-0 mr-2" small>mdi-bell-badge-outline</v-icon>
                        <span>2 new</span>
                    </div>

                    <v-icon>mdi-circle-small</v-icon>

                    <div>
                        <span>Expire {{ expired }}</span>
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
        expired() {
            return dayjs(this.job.expirationDate).fromNow()
        }
    }
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