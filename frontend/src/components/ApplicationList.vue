<template>
    <v-row class="bg-white ma-0"> 
        <v-data-table
            :headers="headers"
            :items="applications"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
    </v-row>
</template>

<script>
import applicationApi from "../utils/applicationApi"
export default {
    name: "ApplicationList",
    data() {
        return {
            headers: [
                { text: 'name', value: 'name' },
                { text: 'phoneNumber', value: 'phoneNumber' },
                { text: 'email', value: 'email' },
                { text: 'description', value: 'description' },
                { text: 'file', value: 'file' }
            ],
            applications: []
        }
    },
    created() {
        const id = localStorage.getItem('userId')
        applicationApi.getApplicationsById(id)
        .then(res => {
            this.applications = [...res.data]
        })
    }
}
</script>

<style lang="scss" scoped>
    .bg-white {
        background: #fff !important;
        min-height: 100vh !important;
    }
</style>