<template>
    <div class="my-10">
      <v-row class="mx-12">
      
        <job-filter
          @filterLevel = " experienceLevel = $event "
          @filterJobType = " jobTypes = $event "
          @filterCategories = " jobCategories = $event "
          @filterSalary = " salaryRanges = $event "
          @closeDialog = " filterDialog = false "
          :isVisible = " filterDialog "
          >
        </job-filter>
        
        <v-col cols="12" md="9">
          <job-search
            @searchJobs = " searchJobs "
            @openFilter = " filterDialog = true "
          >
          </job-search>

          <div v-if=" viewedJobs.length > 0 ">
            <div v-for=" job in viewedJobs " :key=" job.id ">
              <job-item :job=" job "></job-item>
            </div>
          </div>

          <not-found v-else></not-found>

        </v-col>
      </v-row>
    </div>
  </template>
  

<script>
import JobFilter from '../components/JobFilter.vue';
import JobItem from '../components/JobItem.vue';
import JobSearch from '../components/JobSearch.vue';
import NotFound from '../components/NotFound.vue';
import jobApi from '../utils/jobApi';

export default {
components: { JobItem, JobFilter, JobSearch, NotFound },
name: 'MainView',
data() {
  return {
    jobs: [  ],
    experienceLevel: {
      entry: false,
      intermidate: false,
      expert: false
    },
    jobTypes: {
      fullTime: false,
      partTime: false
    },
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
    title: [ ],
    salaryRanges: {
      "0-1000": false,
      "1000-3000": false,
      "3000-5000": false,
      "5000": false
    },
    searchInput: {
      job: "",
      location: ""
    },
    viewedJobs: [],
    filterDialog: false
  }
},
watch: {
  experienceLevel() {
    console.log(this.experienceLevel)
  },
  jobCategoriesFilter() {
    this.viewedJobs = this.jobCategoriesFilter
  }
},
methods: {
  getJobs() {
    jobApi
    .getJobs()
    .then(res => this.jobs = [...res.data])
    .catch(error => console.log(error))
  },
  signIn() {
    window.location.href = 'http://localhost:3001/api/auth/google/callback';
  },
  searchJobs(items)  {
    console.log(items)
    this.searchInput = items
    this.viewedJobs = this.calculateFilteredJobs()
  },
  calculateFilteredJobs() {
    let filteredJobs = [...this.jobCategoriesFilter];

    if (this.searchInput.job !== "") {
      const searchJob = this.searchInput.job ? this.searchInput.job.toLowerCase() : "";

      filteredJobs = filteredJobs.filter(
        job => 
          job.title.toLowerCase() === searchJob ||
          job.name.toLowerCase() === searchJob ||
          job.categories.toLowerCase() === searchJob
      )
    }

    if (this.searchInput.location && this.searchInput.location !== "") {
      const searchCity = this.searchInput.location.toLowerCase();
      filteredJobs = filteredJobs.filter(
        job =>
          job.city.toLowerCase() === searchCity ||
          job.country.toLowerCase() === searchCity
      );
    }
    else {
      filteredJobs = this.jobCategoriesFilter
    } 

    if (this.searchInput.location === "" && this.searchInput.job === "") {
      filteredJobs = this.jobCategoriesFilter
    }

    return filteredJobs;
  }
},
computed: {
  experienceLevelFilter() {
    const values =  Object.values(this.experienceLevel)
    const levels = values.map((v, index )=> {
      return v ? index + 1 : null
    })    

    if (values.includes(true)) {
      return this.jobs.filter(job => levels.includes(job.experienceLevel)) 
    }
    else return this.jobs
    
  },
  jobTypeFilter() {
    const values = Object.keys( this.jobTypes ).filter(v => this.jobTypes[v])

    if (values.length > 0) {
      return this.experienceLevelFilter.filter(job => values.includes(job.jobType))
    }
    else return this.experienceLevelFilter
  },
  jobSalaryFilter() {
    const salaries = Object.keys(this.salaryRanges).filter(v => this.salaryRanges[v])
    
    
    if (salaries.length > 0) {

      const salaryItems = []
  
      for (let i = 0; i < salaries.length; i++) {
        const str = salaries[i].split('-')

        str.forEach(v => salaryItems.push(Number(v)))
      }

      const max = Math.max(...salaryItems)
      const min = Math.min(...salaryItems)

      return this.jobTypeFilter.filter(job => job.minSalary >= min 
                                                    && job.maxSalary <= max )
    }

    return this.jobTypeFilter
  },
  jobCategoriesFilter() {
    const keys = Object.keys( this.jobCategories )
    const selectedItems = keys.filter(v => this.jobCategories[v])

    if (selectedItems.length > 0) {
        return this.jobSalaryFilter.filter(job => this.jobCategories[ job.categories ])
    }
    else return this.jobSalaryFilter
  },
},
created() {
  this.getJobs()
  //axios.get('https://restcountries.com/v3.1/all').then(res => console.log(res.data))
}
}
</script>