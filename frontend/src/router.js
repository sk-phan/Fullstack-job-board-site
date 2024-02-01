import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './views/MainView';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import SingleJobView from './views/SingleJobView';
import MyJobs from './views/MyJobs';
import JobPostingPage from './views/JobPostingPage';
import EditJob from './views/EditJob';
import NewJob from './views/NewJob';
import store from './store';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    beforeEnter(to, from, next) {
      // Call the Vuex mutation here to set hideNavBar to true
      store.commit('setHideNavBar', false);
      next();
    }
  },
  {
    path: '/job/:id',
    name: 'job',
    component: SingleJobView,
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    beforeEnter(to, from, next) {
      // Call the Vuex mutation here to set hideNavBar to true
      store.commit('setHideNavBar', true);
      next();
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    beforeEnter(to, from, next) {
      store.commit('setHideNavBar', true);
      next();
    }
  },
  {
    path: '/myJobs',
    name: 'MyJobs',
    component: MyJobs,
    meta: { requiresAuth: true },
  },
  {
    path: '/jobPosting/:id',
    name: 'JobPosting',
    component: JobPostingPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/editJob/:id',
    name: 'EditJob',
    component: EditJob,
    meta: { requiresAuth: true },
  },
  {
    path: '/newJob',
    name: 'NewJob',
    component: NewJob,
    meta: { requiresAuth: true },
  },
];


const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach( async (to, from, next) => {

  // Check if the current route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!requiresAuth) {
    next();
    return;
  }

  try {
    const isValidToken = await localStorage.getItem('token')

    if (isValidToken) {
      // If the token is valid, proceed to the next route
      next();
    } else {
      // If the token is invalid, redirect to the login page
      next('/login');
    }
  } catch (error) {
    // Handle error, e.g., show an error message or redirect to an error page
    console.error(error);
    next('/error');
  
  }

} )

export default router;
