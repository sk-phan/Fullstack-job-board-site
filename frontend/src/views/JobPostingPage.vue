<template>
    <v-container>
        <v-tabs>
            <v-tab :value="1" @change=" tab = 1 ">Job details</v-tab>
            <v-tab :value="2" @change=" tab = 2 ">Applications</v-tab>
        </v-tabs>

        
    </v-container>
</template>

<script>
export default {
    name: "JobPostingPage",
    data() {
        return {
            tab: 1
        }
    }
}
</script>