<template>
    <v-container fluid class="pa-12">
        <v-row class="justify-center">
            <v-col cols="12" md="7" class="bg pa-12 mr-8">
                <v-row>
                    <v-col class="pl-0">
                        <h2>{{ job.title }}</h2>
                    </v-col>
                    <v-col class="d-flex justify-end">
                        <v-btn depressed>
                            <v-icon small class="mr-2">mdi-cards-heart-outline</v-icon>
                            Save as favourite
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-6 mb-12">
                    <span class="tag mr-3">{{ job.jobType }}</span>
                    <span class="tag">{{ job.city }}, {{ job.country }}</span>
                </v-row>
                <v-row>
                    <p>{{ job.description }}</p>
                </v-row>
            </v-col>

            <v-col md="4" class="bg pa-12">
                <span class="title">Application</span>

                <div class="mt-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-label>First name</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="First name"
                                class="pt-2"
                                >
                            </v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="6">
                            <v-label>Last name</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="Last name"
                                class="pt-2"
                                >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="6">
                            <v-label>Email</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="Email"
                                class="pt-2"
                                >
                            </v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="6">
                            <v-label>Phone number</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="Phone number"
                                class="pt-2"
                                >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-label>Would you like to share something?</v-label>
                            <v-textarea 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="Write something about yourself..."
                                rows="6"
                                class="pt-2"
                                >
                            </v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <vue-dropzone 
                                ref="myVueDropzone" 
                                id="dropzone" 
                                :options="dropzoneOptions"
                                @vdropzone-success="fileUploaded"
                                :useCustomSlot=true>
                                <div class="dropzone-custom-content">
                                    <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                                    <div class="subtitle">...or click to select a file from your computer</div>
                                </div>
                            </vue-dropzone>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import jobApi from '@/utils/jobApi';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import applicationApi from '@/utils/applicationApi'

export default {
    name: 'SingleJobView',
    components: { vueDropzone: vue2Dropzone },
    data() {
        return {
            jobId: this.$route.params.id,
            job: {
                title: "",
                description: ""
            },
            applicant: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                description: '',
                cv: null,
                experienceLevel: 1
            },
            dropzoneOptions: {
                url: 'data:text/plain;base64,',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
                addRemoveLinks: true
            } 
        }
    },
    methods: {
        fileUploaded(file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('firstName', "Nikko");
            formData.append('lastName', this.applicant.lastName);
            formData.append('email', this.applicant.email);
            formData.append('phoneNumber', this.applicant.phoneNumber);
            formData.append('description', this.applicant.description);
            formData.append('companyId', '6443e3ce3999375a8f25731e');
            formData.append('jobSeekerId', null);

            applicationApi.createApplication(formData)
            .then(response => {
                // Handle the response
                console.log(response);
            })
            .catch(error => {
                // Handle the error
                console.error(error);
            });
        }
    },
    created() {
        jobApi.getJobByID(this.jobId)
        .then(res => {
            if (res.data) {
                this.job = {...res.data}
            }
        })
        
    }
}
</script>

<style lang="scss" scoped>
    .bg {
        background: #fff !important;
    }
    .tag {
        background: var(--primary-lighten);
        color: var(--primary-base);
        padding: 2px 8px;
        border-radius: 10px;
    }
    .vue-dropzone {
        border: 2px dashed #eee !important;
        border-radius: 5px;
    }
</style>