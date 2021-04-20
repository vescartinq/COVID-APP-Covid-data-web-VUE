import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';

import store from './store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () =>
      import(/* webpackChunkName: "about" */ './views/NotesScreen.vue'),
      meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ './views/LoginScreen.vue'),
  },
];

// CREATE ROUTER
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// PROTECTED ROUTES
router.beforeEach((to, from, next) => {
  // PrivateRoute require auth (true)
  const privateRoute = to.matched.some(record => record.meta.requireAuth)
  
  // only go to private route if token is valid
  if(privateRoute && store.state.token === ''){
    next({name: 'login'});
  }else{
    next();
  }

});

export default router;
