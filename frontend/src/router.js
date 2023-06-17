import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './views/MainView';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import SingleJobView from './views/SingleJobView';
import MyJobs from './views/MyJobs';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
   // meta: { requiresAuth: true } // Add the meta property to specify authentication requirement
  },
  {
    path: '/job/:id',
    name: 'job',
    component: SingleJobView,
   // meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/myJobs',
    name: 'MyJobs',
    component: MyJobs,
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

    console.log("isValid", isValidToken)
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
