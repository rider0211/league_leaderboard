import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import SchedulePage from './components/SchedulePage.vue';
import LeaderboardPage from './components/LeaderboardPage.vue';
import NotFoundPage from './components/NotFoundPage.vue';
import './assets/tailwind.css';
Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: '/', component: SchedulePage },
  { path: '/schedule', component: SchedulePage },
  { path: '/leaderboard', component: LeaderboardPage },
  { path: '*', component: NotFoundPage }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
