<template>
    <v-app-bar flat>
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