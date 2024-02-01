<template>
    <filter-dialog
    v-if="isMobile"
    :visible="visible"
    :categories="jobCategories"
    :experiences="experienceLevel"
    :types="jobTypes"
    :salary="salaryRanges"
    @filterLevel="e => $emit('filterLevel', e)"
    @filterJobType="e => $emit('filterJobType',e)"
    @filterSalary="e =>$emit('filterSalary',e)"
    @filterCategories="e =>$emit('filterCategories',e)"
    @closeDialog="closeFilterDialog"
    ></filter-dialog>

    <filter-side-bar
    v-else
    :categories="jobCategories"
    :experiences="experienceLevel"
    :types="jobTypes"
    :salary="salaryRanges"
    @clearFilter="clearFilter"
    @filterLevel="e => $emit('filterLevel', e)"
    @filterJobType="e => $emit('filterJobType',e)"
    @filterSalary="e =>$emit('filterSalary',e)"
    @filterCategories="e =>$emit('filterCategories',e)">
    </filter-side-bar>
</template>

<script>
import FilterDialog from './FilterDialog.vue'
import FilterSideBar from './FilterSideBar.vue'
export default {
  components: { FilterDialog, FilterSideBar },
    name: 'JobFilter',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            jobCategories: {
                "Accounting": false,
                "Administration": false,
                "Customer Service": false,
                "Design": false,
                "Engineering": false,
                "Finance": false,
                "Healthcare": false,
                "Human Resources": false,
                "Information Technology (IT)": false,
                "Legal": false,
                "Marketing": false,
                "Operations": false,
                "Sales": false
                },
            experienceLevel: {
                entry: false,
                intermidate: false,
                expert: false
            },
            jobTypes: {
                fullTime: false,
                partTime: false
            },
            salaryRanges: {
                "0-1000": false,
                "1000-3000": false,
                "3000-5000": false,
                "0-5000": false
            },
            visible: this.isVisible
        }
    },
    computed: {
        jobCategoriesKeys() {
            return Object.keys(this.jobCategories)
        },
        isMobile() {
            return this.$vuetify.breakpoint.mobile
        }
    },
    methods: {
        clearFilter() {
            this.jobTypes = {
                fullTime: false,
                partTime: false
            }

            this.experienceLevel = {
                entry: false,
                intermidate: false,
                expert: false
            }
            
            this.salaryRanges = {
                "0-1000": false,
                "1000-3000": false,
                "3000-5000": false,
                "0-5000": false
            }
            for( let i in this.jobCategories ) {
                this.jobCategories[i] = false
            }

            this.$emit('filterJobType', this.jobTypes)
            this.$emit('filterLevel', this.experienceLevel)
            this.$emit('filterLevel', this.experienceLevel)
            this.$emit('filterSalary', this.salaryRanges)
        },
        closeFilterDialog() {
            this.$emit('closeDialog')
            this.clearFilter;
        },
        closeDialog() {
            this.$emit('closeDialog')
        }
    },
    watch: {
        isVisible() {
            this.visible = this.isVisible;
        }
    },
    created() {
        this.visible = this.isVisible;

    }
}
</script>

<style lang="scss" scoped>
</style>