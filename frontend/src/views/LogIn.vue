<template>
    <v-container fluid class="pt-0 bg">
        <v-row class="container pt-0">
            <v-col cols="12" md="5" :class="{ 'justify-center': isMobile, 'pl-10': !isMobile }" class="form-col">
                <v-form ref="form" class="form">
                    <h3 class="mb-6 title">Log in</h3>
                    <v-row>
                        <v-col>
                            <v-label>Username</v-label>
                            <v-text-field 
                                outlined 
                                v-model="email"
                                :rules="[rules.required]"
                            >
                            </v-text-field>                    
                        </v-col>
                    </v-row>

                    <v-row class="mt-0 mb-2">
                        <v-col>
                            <v-label>Password</v-label>
                            <v-text-field 
                                outlined 
                                v-model="password"
                                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPass = !showPass"
                                :type="showPass ? 'text' : 'password'"
                                :rules="[rules.required, rules.password]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn block color="primary" class="mb-6" depressed @click=" logIn ">Log in</v-btn> 
                    <span>Don't have an account?
                        <a class="link" href="/signup">Sign up</a>
                    </span>
                </v-form>
            </v-col>

            <v-col v-if="!isMobile ">
                <div class="side-bg">
                    <img class="img" :src="bg" alt="log in image"/>
                </div>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
import authApi from '@/utils/authApi';
import img from '../assets/bg.png';
import formRules from '../mixins/formRules';

export default {
    name: 'LogIn',
    data() {
        return {
            email: '',
            password: '',
            bg: img,
            showPass: false
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
    .container {
        width: 100vw !important;
        height: 100vh;
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
        height: 100%;
        display: flex;        
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

</style>