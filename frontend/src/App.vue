<template>
  <v-app>
    <v-container fluid class="padding bg">
      <main-nav v-if=" !$store.state.hideNavBar "></main-nav>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
  import MainNav from './components/MainNav.vue';
  export default {
    name: 'App',
    components: {MainNav  },
    data () {
      return {

      }
    },
    created() {

    }
  };
</script>

<style lang="scss">

  @import "@/scss/main.scss";

  .padding {
    padding: 0 !important;
  }
  button {
    text-transform: none !important;
  }
  .bg {
    background: #f5f5f5 !important;
    height: 100vh !important;
    overflow: scroll !important;
  }
</style>