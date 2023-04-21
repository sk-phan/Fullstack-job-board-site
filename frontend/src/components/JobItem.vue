<template>
   <div>
        <span> {{ job.title }} </span>
        <span> Company A </span>
        <span> {{ job.jobType }} </span>
        <span> Salary range: {{ job.minSalary }}-{{ job.maxSalary  }}  </span>
        <span> {{ job.city }}, {{ job.country }} </span>
        <span> {{ job.createdAt }} </span>
        <span> {{ job.description }} </span>
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