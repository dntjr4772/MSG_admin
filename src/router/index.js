import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import ViewUser from '@/components/ViewUser';
import Login from '@/components/Login';
import Register from '@/components/Register';
import RestaurantList from '@/components/RestaurantList';
import ViewRestUser from '@/components/ViewRestUser';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode:"history",
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/:user_id',
      name: 'view-user',
      component: ViewUser,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'restaurantList',
      component: RestaurantList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:restuser_id',
      name: 'view-restuser',
      component: ViewRestUser,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
