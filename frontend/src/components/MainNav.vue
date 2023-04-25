<template>
    <v-app-bar flat class="nav">
        <v-toolbar-title>
          <img :src="logoImg" style="height: 20px ;" alt="image"/>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-btn text>  
          Log in    
        </v-btn>
  
        <v-btn depressed lowercase color="primary">  
          Sign up    
        </v-btn>

      </v-app-bar>
</template>

<script>
import logo from "../assets/logo.png"
export default {
    name: 'MainNav',
    data() {
        return {
            logoImg: logo
        }
    }
}
</script>

<style lang="scss" scoped>
  .nav {
    background: #fff !important;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px !important;
  }
</style>