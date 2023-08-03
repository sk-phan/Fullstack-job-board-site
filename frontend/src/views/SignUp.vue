<template>
    <v-container fluid class="pt-0 container">
        <v-row class="pt-0">
            <v-col cols="12" md="5" class="pl-10 form-col">
                <v-form ref="form" class="px-16">
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
                            <v-label>Name</v-label>
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
    
                    <v-row class="mt-0 mb-2">
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
                    <v-btn block color="#000" class="mb-6 btn-text" depressed @click=" signUp ">Sign up</v-btn> 
                        <span>Already have an account?
                            <a class="link" href="/login">Log in</a>
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
            ]
        }
    },
    mixins: [formRules],
    methods: {
        signUp() {
            if (this.$refs.form.validate()) {
                authApi
                .signUp(this.newUser)
                .then(res => {
                    if (res.data) {
                        this.$router.push('/')
                        this.$store.commit('setHideNavBar', false)
                    }
                })
            }
        }
    },
    beforeCreate() {
        this.$store.commit('setHideNavBar', true)
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
    .form-col {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .title {
        font-size: 24px !important;
    }
    .link {
        text-decoration: none;
    }
    .btn-text {
        color: #fff;
    }
</style>