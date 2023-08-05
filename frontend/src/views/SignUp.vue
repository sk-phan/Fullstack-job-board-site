<template>
    <v-container fluid class="pt-4 bg">
        <v-row class="pt-0 white-bg" :class="{ 'container': !isMobile }">
            <v-col cols="12" md="5" class="text-side" :class="{ 'd-flex justify-center': isMobile, 'pl-10 form-col': !isMobile }">
                <v-form ref="form" class="form">
                    <h3 class="mb-6 title">Sign up</h3>
                    <v-row class="mt-0">
                        <v-col>
                            <v-label>I am</v-label>
                            <v-select
                                :items=" userTypes "
                                outlined
                                flat
                                v-model="newUser.userType"
                                disabled
                            >
                            </v-select>
                        </v-col>
                    </v-row>

                    <v-row class="mt-0">
                        <v-col>
                            <v-label>Company</v-label>
                            <v-text-field 
                                outlined 
                                v-model="newUser.name"
                                :rules="[rules.required]"
                            >
                            </v-text-field>                    
                        </v-col>
                    </v-row>

                    <v-row class="mt-0">
                        <v-col>
                            <v-label>Email</v-label>
                            <v-text-field 
                                outlined 
                                v-model="newUser.email"
                                :rules="[rules.required, rules.email]"
                            >
                            </v-text-field>                    
                        </v-col>
                    </v-row>

                    <v-row class="mt-0 mb-6">
                        <v-col>
                            <v-label>Company logo </v-label>
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

                    <v-btn block color="#000" class="mb-6 text-white" depressed @click=" logIn ">Sign up</v-btn> 
                    <span>Already have an account?
                        <a class="link" href="/login">Log in</a>
                    </span>
                </v-form>
            </v-col>

            <v-col v-if=" !isMobile " class="pa-0">
                <div class="side-bg">
                    <img class="img" :src="bg" alt="log in image"/>
                </div>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import authApi from '@/utils/authApi';
import img from '../assets/signUpBg.png';
import formRules from '../mixins/formRules';
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
    name: 'SignUp',
    components: { vueDropzone: vue2Dropzone },
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                userType: 1
            },
            bg: img,
            showPass: false,
            userTypes: [
                {
                    text: "Recruiter",
                    value: 1
                },
                {
                    text: "Talent",
                    value: 2
                }
            ],
            dropzoneOptions: {
                url: 'data:text/plain;base64,',
                thumbnailWidth: 150,
                maxFilesize: 5,
                headers: { "My-Awesome-Header": "header value" },
                addRemoveLinks: true
            },
            file: null
        }
    },
    mixins: [formRules],
    methods: {
        logIn() {
            if (this.$refs.form.validate()) {
                authApi
                .logIn(this.email, this.password)
                .then(res => {
                    if (res.data) {

                        this.$store.commit('setHideNavBar', false)
                        
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('refreshToken', res.data.refreshToken)
                        
                        localStorage.setItem('userId', res.data.id)

                        setTimeout(() => {
                            if (res.data.userType === 1) {
                                this.$router.push('/myJobs')
                            }
                            else {
                                this.$router.push('/')
                            }
                        }, 300)
                        
                    }
                })
            }
        }
    },
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-side {
        background: white;
        height: 100vh;
    }
    .container {
        width: 100vw !important;
    }
    .side-bg {
        background: var(--primary-base);
        right: 0;
    }
    .img {
        width: auto;
        height: 100%;
        min-height: 100vh;
        position: absolute;
        overflow-x: hidden;
    }
    
    .form-col {
        display: flex;        
        height: 100vh;
        align-items: center;
    }
    .form {
        width: 80%;
    }
    .title {
        font-size: 24px !important;
    }
    .link {
        text-decoration: none;
    }

    .vue-dropzone {
        border: 2px dashed #eee !important;
        border-radius: 10px;
    }
</style>