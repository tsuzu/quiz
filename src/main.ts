import Vue from 'vue';
import './plugins/vuetify';
import 'vuetify/src/stylus/app.styl';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

document.ontouchmove = function (event) {
  event.preventDefault();
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
