<template>
   <v-row class="card pa-4 mb-10">
        <v-col>
            <v-row>
                <v-col class="d-flex" cols="11">
                    <img class="rounded mr-4" :src="img" alt="company logo" width="50px" height="50px"/>
                    <div class="d-flex flex-column">
                        <span class="title"> {{ job.title }} </span>
                        <span class="name"> {{ job.name }} </span>
                    </div>
                </v-col>
                <v-col class="d-flex flex-column justify-start">
                    <v-icon>mdi-bookmark-outline</v-icon>
                </v-col>
            </v-row>
    
            <v-row class="mx-0">
                <v-col md="11" class="mx-0 px-0">
                    <p>We are seeking a talented graphic designer to join our team. 
                    You will work on a variety of projects, such as designing marketing materials, creating social media graphics...</p>
                </v-col>
            </v-row>
            <v-row class="mx-0 mb-10">
                <div>
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text">{{ job.categories }}</span>   
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text">{{ jobType }}</span> 
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text">{{ job.minSalary }}-{{ job.maxSalary }} €</span>     
                </div>
            </v-row>
    
            <v-row class="mx-0">
                <v-col class="d-flex align-center px-0" md="9">
                    <span class="small-text d-flex flex-row align-center"> 
                        <v-icon small>mdi-map-marker-outline</v-icon> 
                        {{ job.city }}, {{ job.country }} 
                    </span>
                    <v-icon>mdi-circle-small</v-icon>
                    <span class="small-text"> {{ createdDate }} </span>
                </v-col>
                <v-col class="pa-0 ma-0 d-flex justify-end">
                    <v-btn width="160" color="#000" class="btn-text" depressed lowercase>Apply</v-btn>
                </v-col>
            </v-row>
        </v-col>
   </v-row>
</template>

<script>
import dayjs from 'dayjs';
import sample from '../assets/sample.png'

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
            img: sample
        }
    },
    computed: {
        createdDate() {
            return 'Posted ' + dayjs(this.job.createdAt).fromNow()
        },
        jobType() {
            return this.job.jobType === 'fullTime' ? 'Full time' : 'Part time'
        }
    }
}
</script>

<style lang="scss" scoped>
    .card {
        background: white;
    }
    .highlight {
        list-style: none;
        background: var(--primary-lighten);
        color: var(--primary-base);
    }
    .salary {
        color: var(--primary-base);
        font-weight: 500;
    }
    .small-text {
        font-size: 14px;
    }
    .name {
        font-size: 14px;
        color: var(--secondary-base);
    }
    .btn-text {
        color: #fff;
    }
    .description {
        color: var(--secondary-base);
    }
</style>