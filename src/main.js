
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import './components/firebaseInit';

Vue.config.productionTip = false;

let app;
//새로고침해도 로그인창으로 튕겨나가지 않음
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: { App },
      //render: h => h(App)
    });
  }
});
