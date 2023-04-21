<template>
   <div class=" card rounded pa-4 mb-4 ">
        <div class="d-flex flex-row justify-space-between mb-6">
            <div class="d-flex flex-row">
                <img class="rounded mr-4" src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80" alt="company logo" width="50px" height="50px"/>
                <div class="d-flex flex-column">
                    <span class="title"> {{ job.title }} </span>
                    <div>
                        <span> Company {{ job.username }} </span>
                        <span> {{ job.jobType }} </span>
                        <span> Salary range: {{ job.minSalary }}-{{ job.maxSalary  }}  </span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <span> {{ job.city }}, {{ job.country }} </span>
                <span> {{ job.createdAt }} </span>
            </div>
        </div>
        <p> {{ job.description }} </p>
   </div>
</template>

<script>
export default {
    name: 'JobItem',
    props: {
        job: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        border: #eee solid 1px;
    }
</style>