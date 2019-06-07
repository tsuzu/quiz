import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Waiting from './views/Waiting.vue';
import Quiz from './views/Quiz.vue';
import Ranking from './views/Ranking.vue';
import Viewer from '@/views/Viewer.vue'
import API from '@/API';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/waiting',
      name: "waiting",
      component: Waiting,
    },
    {
      path: '/quiz/:id',
      name: "quiz",
      component: Quiz,
    },
    {
      path: '/ranking',
      name: "ranking",
      component: Ranking,
    },
    {
      path: '/view',
      name: "view",
      component: Viewer,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path !== '/view' && API.getObservable() == null) {
    next("/")

    return;
  }
  next()
})


export default router;