import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './views/MainView';
import TestVue from './components/TestVue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
  },
  {
    path: '/h',
    name: 'TestView',
    component: TestVue,
  },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
