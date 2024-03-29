<template>
    <v-container fluid class="pa-12 container">
        <v-row class="justify-center">
            <v-col cols="12" md="7" class="bg pa-12 rounded" :class="{ 'mr-8': !isMobile, 'mb-6': isMobile }">
                <v-row>
                    <v-col class="pl-0">
                        <h2>{{ job.title }}</h2>
                    </v-col>
                </v-row>
                <v-row class="mt-6 mb-12">
                    <span class="tag mr-3">{{ jobType }}</span>
                    <span class="tag">{{ job.city }}, {{ job.country }}</span>
                </v-row>

                <v-row>
                    <p>{{ job.description }}</p>
                </v-row>

                <v-row>
                    <v-col>
                        <v-row class="title-2 mb-2">Responsibility</v-row>
                        <v-row>
                            <p class="responsibility-text">
                                {{ job.responsibility }}
                            </p>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-row class="title-2 mb-2">Skills</v-row>
                        <v-row>
                            <p class="responsibility-text">
                                {{ job.skills }}
                            </p>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <v-row class="title-2 mb-2">Benefits</v-row>
                        <v-row>
                            <p class="responsibility-text">
                                {{ job.benefits }}
                            </p>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>

            <v-col md="4" class="bg pa-12 rounded">
                <span class="title">Application</span>

                <v-form ref="form" class="mt-6">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-label>Name *</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="First name"
                                class="pt-2"
                                v-model="applicant.name"
                                :rules="[ rules.required ]"
                                >
                            </v-text-field>
                        </v-col>
    
                        <v-col cols="12" md="6">
                                <v-label>Phone number *</v-label>
                                <v-text-field 
                                    outlined
                                    flat
                                    solo
                                    dense
                                    placeholder="Phone number"
                                    class="pt-2"
                                    v-model="applicant.phoneNumber"
                                    :rules="[ rules.required ]"
                                    >
                                </v-text-field>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12">
                            <v-label>Email *</v-label>
                            <v-text-field 
                                outlined
                                flat
                                solo
                                dense
                                placeholder="Email"
                                class="pt-2"
                                v-model="applicant.email"
                                :rules="[ rules.required, rules.email ]"
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
                                rows="4"
                                class="pt-2"
                                v-model="applicant.description"
                                >
                            </v-textarea>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-label>CV *
                                <span v-if="!file" class="text-error ml-2">Required</span>
                            </v-label>
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

                    <v-row class="pt-6">
                        <v-col>
                            <v-btn @click="send" color="primary" depressed block>Send application</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
        
        <confirm-dialog
            :visible = " confirmDialog "
            :company=" job.name "
            @closeModal = " confirmDialog = false "
        >
        </confirm-dialog>
    </v-container>
</template>

<script>
import jobApi from '@/utils/jobApi';
import userApi from '@/utils/userApi';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import applicationApi from '@/utils/applicationApi'
import formRules from '@/mixins/formRules';
import ConfirmDialog from '../components/ConfirmDialog.vue';

export default {
    name: 'SingleJobView',
    components: { vueDropzone: vue2Dropzone, ConfirmDialog },
    mixins: [formRules],
    data() {
        return {
            jobId: this.$route.params.id,
            job: {
                title: "",
                description: ""
            },
            applicant: {
                name: '',
                email: '',
                phoneNumber: '',
                description: '',
                cv: null,
                experienceLevel: 1,
            },
            dropzoneOptions: {
                url: 'data:text/plain;base64,',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { "My-Awesome-Header": "header value" },
                addRemoveLinks: true
            },
            file: null,
            confirmDialog: false 
        }
    },
    methods: {
        fileUploaded(file) {
            this.file = file
        },
        send() {

            if (this.$refs.form.validate() && this.file) {
                const formData = new FormData();
    
                formData.append('file', this.file);
                formData.append('name', this.applicant.name);
                formData.append('email', this.applicant.email);
                formData.append('phoneNumber', this.applicant.phoneNumber);
                formData.append('description', this.applicant.description);
                formData.append('companyId', this.job.user);
                formData.append('jobSeekerId', this.$store.state.user.id);
                formData.append('jobId', this.jobId);
    
                applicationApi.createApplication(formData)
                .then(() => {

                    this.confirmDialog = true;

                    this.applicant = {
                        name: '',
                        email: '',
                        phoneNumber: '',
                        description: '',
                        cv: null,
                        experienceLevel: 1,
                    }
                    this.$refs.myVueDropzone.removeFile(this.file)
                    this.file = null;

                    if (this.$store.state.user && this.$store.state.userType === 2) {
                        this.updateUsersJob()
                    }
                })
                
                .catch(error => {
                    console.error(error);
                });
            }
        },
        updateUsersJob() {
            const currentUser = {...this.$store.state.user}

            currentUser.jobs.push(this.job)
            userApi
            .updateUser(currentUser)
        }
    },
    computed: {
        jobType() {
            return this.job.jobType === "fullTime" ? 'Full-time' : 'Part-time'
        },
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
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
        border-radius: 10px;
    }
    .responsibility-text {
        white-space: pre-line;
    }

    .container {
        background: transparent !important;
    }
</style>