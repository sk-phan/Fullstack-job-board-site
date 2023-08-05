<template>
  <v-dialog
      v-model="isVisible"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>

        <v-card-text>
            <div class="bg pa-6 mr-6 rounded">
        <v-row class="mx-0 align-center justify-space-between mb-6">
            <span class="mb-0">Filter</span>
            <v-btn text class="pa-0" color="primary" @click="clearFilter">Clear all</v-btn>
        </v-row>

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
                        <v-col cols="1">
                            <span class="light-text">6</span>
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
                        <v-col cols="1">
                            <span class="light-text">20</span>
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
                        <v-col cols="1">
                            <span class="light-text">12</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
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
                        <v-col cols="1">
                            <span class="light-text">1</span>
                        </v-col>
                    </v-row>
                </div>
                
            </v-col>
        </v-row>
    </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
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
        }
    },
    data() {
        return {
            isVisible: this.visible
        }
    }
}
</script>

<style>

</style>