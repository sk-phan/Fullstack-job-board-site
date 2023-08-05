<template>
    <v-app-bar flat class="nav">
        <v-toolbar-title class="hover-style" @click="goBack">
          <img :src="logoImg" style="height: 20px ;" alt="image"/>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>

        <v-btn v-if="authenticated" text>  
          My jobs    
        </v-btn>
        
        <v-btn v-if="!authenticated" text class="mr-3" @click=" logIn ">  
          Log in    
        </v-btn>
  
        <v-btn v-if="!authenticated" depressed lowercase color="primary" @click="signUp">  
          Sign up    
        </v-btn>

        <v-btn v-if="authenticated" text @click="logOut">  
          Log out    
        </v-btn>

      </v-app-bar>
</template>

<script>
import logo from "../assets/logo.png"
export default {
    name: 'MainNav',
    data() {
        return {
            logoImg: logo,
            authenticated: null
        }
    },
    methods: {
      logIn() {
        this.$router.push('/login')
      },
      signUp() {
        this.$router.push('/signup')
      },
      logOut() {
        localStorage.clear();
        this.authenticated = null;

        if (this.$router.history.current.name !== "MainView") {
          this.$router.push('/')
        }
      },
      goBack() {
        !this.authenticated ? this.$router.push('/') : this.$router.push('/myJobs')
      }
    },
    mounted() {
      const isValidToken = localStorage.getItem('token')
      this.authenticated = isValidToken
    }
}
</script>

<style lang="scss" scoped>
  .nav {
    background: #fff !important;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px !important;
  }
  .hover-style {
    cursor: pointer !important;
  }
</style>