import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './views/MainView';
import LogIn from './views/LogIn';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },

];


const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
