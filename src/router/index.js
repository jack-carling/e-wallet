import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import AddCard from '../views/AddCard.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/add',
    component: AddCard
  }
]

const router = new VueRouter({
  routes
});

export default router;