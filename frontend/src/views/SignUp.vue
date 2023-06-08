<template>
    <v-container fluid class="pt-0">
        <v-row class="container pt-0">
            <v-col cols="12" md="5" class="pl-10">
                <v-form ref="form" class="form">
                    <h3 class="mb-6 title">Sign up</h3>
                    <v-row>
                        <v-col>
                            <v-label>Username</v-label>
                            <v-text-field 
                                outlined 
                                v-model="username"
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
                                :rules="[rules.required]"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn block color="primary" class="mb-6" depressed @click=" logIn ">Log in</v-btn> 
                    <span>Already have an account?
                        <a class="link" href="/">Log in</a>
                    </span>
                </v-form>
            </v-col>

            <v-col>
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

export default {
    name: 'SignUp',
    data() {
        return {
            username: '',
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
                .logIn(this.username, this.password)
                .then(res => {
                    if (res.data) {
                        this.$router.push('/')
                        this.$store.commit('setHideNavBar', false)
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('refreshToken', res.data.refreshToken)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100vw !important;
    }
    .side-bg {
        background: var(--primary-base);
        right: 0;
    }
    .img {
        width: auto;
        height: 100vh;
        position: absolute;
        overflow-x: hidden;
    }
    .form {
        width: 80%;
        position: relative;
        top: 50%;
    }
    .title {
        font-size: 24px !important;
    }
    .link {
        text-decoration: none;
    }
</style>