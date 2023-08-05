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

                    <v-row class="mt-0">
                        <v-col>
                            <v-label>Password</v-label>
                            <v-text-field 
                                outlined 
                                v-model="newUser.password"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPass = !showPass"
                                :type="showPass ? 'text' : 'password'"
                                :rules="[rules.required, rules.password]"
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

                    <v-btn block color="#000" class="mb-6 text-white" depressed @click=" signUp ">Sign up</v-btn> 
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
        fileUploaded(file) {
            this.file = file
        },
        signUp() {
            if (this.$refs.form.validate()) {

                const formData = new FormData();
    
                formData.append('file', this.file);
                formData.append('name', this.newUser.name);
                formData.append('email', this.newUser.email);
                formData.append('password', this.newUser.password);
                formData.append('userType', this.newUser.userType);

                authApi
                .signUp(formData)
                .then(res => {
                    console.log(res)

                        if (res.data) {
                        this.$router.push('/')
                        this.$store.commit('setHideNavBar', false)
                
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