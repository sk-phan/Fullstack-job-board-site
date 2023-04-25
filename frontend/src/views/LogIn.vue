<template>
    <v-container>
        <div class="d-flex flex-row">
                <v-form ref="form">
                    <v-text-field outlined label="Username" v-model="username"></v-text-field>
                    <v-text-field outlined label="Password" v-model="password"></v-text-field>
                    <v-btn color="primary" depressed @click=" logIn ">Log in</v-btn>
                </v-form>

                <div class="side-bg">
                    <img class="img" :src="bg" alt="log in image"/>
                </div>
            </div>
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
            .then(res => console.log(res.data, "sign in"))
        }
    }
}
</script>

<style lang="scss" scoped>
    .side-bg {
        background: var(--primary-base);
        right: 0;
    }
    .img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }
</style>