import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './views/MainView'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView,
  },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
