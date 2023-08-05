<template>
   <v-row @click=" goToJob " class="card pa-4 mb-10">
        <v-col>
            <v-row class="d-flex justify-space-between">
                <div class="d-flex" cols="11">
                    <img class="rounded mr-4" :src="img" alt="company logo" width="50px" height="50px"/>
                    <div class="d-flex flex-column">
                        <span class="title"> {{ job.title }} </span>
                        <span class="name"> {{ job.name }} </span>
                    </div>
                </div>
                <!-- <div>
                    <v-btn @click.stop="saveFavouriteJob" text class="ma-0 pa-0">
                        <v-icon>mdi-bookmark-outline</v-icon>
                    </v-btn>
                </div> -->
            </v-row>
    
            <v-row class="mx-0">
                <v-col md="11" class="mx-0 px-0">
                    <p>{{ description }}</p>
                </v-col>
            </v-row>
            <v-row class="mx-0" :class="{'mb-2': isMobile, 'mb-10': !isMobile}">
                <div>
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text" :class="{ 'inline-block mb-1': isMobile }">{{ job.categories }}</span>   
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text" :class="{ 'inline-block mb-1': isMobile }">{{ jobType }}</span> 
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text" :class="{ 'inline-block mb-1': isMobile }">{{ level[ job.experienceLevel - 1 ] }}</span> 
                    <span class="rounded pa-2 px-4 mr-2 highlight small-text" :class="{ 'inline-block mb-1': isMobile }">{{ job.minSalary }} - {{ job.maxSalary }} €</span>     
                </div>
            </v-row>
    
            <v-row class="mx-0">
                <v-col  class="d-flex px-0"  :class="{ 'flex-column align-start': isMobile, 'align-center': !isMobile }" md="9" cols="12">
                    <span class="small-text d-flex flex-row align-center"> 
                        <v-icon small>mdi-map-marker-outline</v-icon> 
                        {{ job.city }}, {{ job.country }} 
                    </span>
                    <v-icon v-if=" !isMobile ">mdi-circle-small</v-icon>
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
import jobApi from '../utils/jobApi';

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
            img: sample,
            level: [
                'Entry level',
                'Intermidate',
                'Expert'
            ]
        }
    },
    computed: {
        createdDate() {
            return 'Posted ' + dayjs(this.job.createdAt).fromNow()
        },
        jobType() {
            return this.job.jobType === 'fullTime' ? 'Full time' : 'Part time'
        },
        description() {
            const text = this.job.description.split(" ").slice(0, 29)
        
            return text.join(" ") + " ..."
        },
        isMobile() {
            return this.$vuetify.breakpoint.mobile
        }
    },
    methods: {
        goToJob() {
            this.$router.push({ name: 'job', params: { id: this.job.id }})
        },
        saveFavouriteJob() {
            console.log("save")
            jobApi.saveFavouriteJob("64832c4bf9958d87969d9155", this.job.id)
        }
    },
    created() {
        const backendURL = 'http://localhost:3001'; // Replace with your actual backend URL
        const imageURL = `${backendURL}/${this.job.companyLogo}`;

        fetch(imageURL)
        .then(response => {
            this.img = response.url
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
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