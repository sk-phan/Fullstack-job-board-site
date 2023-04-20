<template>
  <v-app>
    <v-container fluid class="padding">
      <main-nav></main-nav>

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
  .padding {
    padding: 0 !important;
  }
  button {
    text-transform: none !important;
  }
</style>