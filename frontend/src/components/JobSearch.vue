<template>
    <v-row>
        <v-col class="px-0 mr-4 pt-0" cols="12" md="7">
            <v-text-field
                flat
                solo
                dense
                v-model=" search.job "
                placeholder=" Job title, keyword or company "
                append-icon="mdi-magnify"
            >
            </v-text-field>
        </v-col>

        <v-col class="px-0 mr-4 pt-0" cols="12" md="3">
            <v-text-field
                solo
                flat
                dense
                v-model=" search.location "
                placeholder="City or country"
                append-icon="mdi-map-marker-outline"
            >
            </v-text-field>
        </v-col>

        <v-col class="px-0 pt-0">
            <v-btn 
                class="px-9 py-5" 
                depressed 
                color="primary"
                @click=" findJobs ">
                Find jobs
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "JobSearch", 
    data() {
        return {
            search: {
                job: "",
                location: ""
            }
        }
    },
    methods: {
        findJobs() {
            this.$emit('searchJobs', this.search )
        }
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep .mdi-magnify::before, ::v-deep .mdi-map-marker-outline::before  {
        font-size: 18px !important;
    }
</style>