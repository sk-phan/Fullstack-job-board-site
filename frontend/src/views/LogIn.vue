<template>
    <v-container fluid>
        <v-row class="container">
            <v-col cols="12" md="5" class="pl-10">
                <v-form class="form">
                    <h3 class="mb-6">Log in</h3>
                    <v-text-field outlined label="Username" v-model="username"></v-text-field>                    
                    <v-text-field outlined label="Password" v-model="password"></v-text-field>
                    <v-btn block color="primary" depressed @click=" logIn ">Log in</v-btn> 
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
import img from '../assets/bg.png';

export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            bg: img
        }
    },
    methods: {
        logIn() {
            authApi
            .logIn(this.username, this.password)
            .then(res => {
                if (res.data) {
                    console.log(res.data, "sign in")
                }
            })
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
</style>