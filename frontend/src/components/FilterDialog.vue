<template>
  <v-dialog
      v-model="isVisible"
      max-width="100vw"
    >
        <v-card>
            <v-card-title class="text-h5 d-flex justify-space-between">
                <span class="mb-0">Filter</span>
                <v-btn text class="pa-0" color="primary" @click="$emit('closeDialog')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <div>
                    <v-row>
                        <v-col>
                            <span class="label">Experience level</span>
                            <div class="mt-4">
                                <v-row>
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Entry level"
                                            color="primary"
                                            hide-details
                                            v-model=" experienceLevel.entry "
                                            @change=" $emit('filterLevel', experienceLevel) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                
                                <v-row >
                                    <v-col  cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Intermidate"
                                            color="primary"
                                            hide-details
                                            v-model=" experienceLevel.intermidate "
                                            @change=" $emit('filterLevel', experienceLevel) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>

                                <v-row >
                                    <v-col  cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Expert"
                                            color="primary"
                                            hide-details
                                            v-model=" experienceLevel.expert "
                                            @change=" $emit('filterLevel', experienceLevel) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>

                    <v-row class="mt-6">
                        <v-col>
                            <span class="label">Job type</span>
                            <div class="mt-4">
                                <v-row>
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Full time"
                                            color="primary"
                                            hide-details
                                            v-model=" jobTypes.fullTime "
                                            @change="$emit('filterJobType', jobTypes)"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                
                                <v-row >
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Part time"
                                            color="primary"
                                            hide-details
                                            v-model=" jobTypes.partTime "
                                            @change="$emit('filterJobType', jobTypes)"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-col>
                    </v-row>

                    <v-row class="mt-6">
                        <v-col>
                            <span class="label">Salary range</span>
                            <div class="mt-4">
                                <v-row>
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Under 1000€"
                                            color="primary"
                                            hide-details
                                            v-model=" salaryRanges['0-1000'] "
                                            @change=" $emit('filterSalary', salaryRanges) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                
                                <v-row >
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="1000€ - 3000€"
                                            color="primary"
                                            hide-details
                                            v-model=" salaryRanges['1000-3000'] "
                                            @change=" $emit('filterSalary', salaryRanges)"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>

                                <v-row >
                                    <v-col  cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="3000€ - 5000€"
                                            color="primary"
                                            hide-details
                                            v-model=" salaryRanges['3000-5000'] "
                                            @change=" $emit('filterSalary', salaryRanges) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>

                                <v-row >
                                    <v-col  cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            label="Up to 5000€"
                                            color="primary"
                                            hide-details
                                            v-model=" salaryRanges[5000] "
                                            @change="$emit('filterSalary', salaryRanges)"
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>

                                
                            </div>
                            
                        </v-col>
                    </v-row>

                    <v-row class="mt-6">
                        <v-col>
                            <span class="label">Job title</span>
                            <div class="mt-4">
                                <v-row v-for="i in jobCategoriesKeys" :key="i">
                                    <v-col cols="10">
                                        <v-checkbox
                                            class="ma-0 pa-0"
                                            :label="i"
                                            color="primary"
                                            hide-details
                                            v-model=" jobCategories[i] "
                                            @change=" $emit('filterCategories', jobCategories) "
                                        ></v-checkbox>
                                    </v-col>
                                </v-row>
                            </div>
                            
                        </v-col>
                    </v-row>
                    
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$emit('closeDialog')" color="primary">Search jobs</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'FilterDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        categories: {
            type: Object,
        },
        experiences: {
            type: Object,
        },
        types: {
            type: Object,
        },
        salary: {
            type: Object,
        },
    },
    data() {
        return {
            isVisible: this.visible,
            jobCategories: this.categories,
            experienceLevel: this.experiences,
            jobTypes: this.types,
            salaryRanges: this.salary,
        }
    },
    computed: {
        jobCategoriesKeys() {
            return Object.keys(this.jobCategories)
        }
    },
    watch: {
        visible() {
            this.isVisible = this.visible
        }
    }
}
</script>

<style>

</style>