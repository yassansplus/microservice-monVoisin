import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import HelloWorld from "./components/HelloWorld";
import inscription from "./components/pages/inscription";
import dua from "./components/pages/home";
import connexion from "./components/pages/connexion";
import VueCookie from 'vue-cookie';
import store from './store';
import axiosConfig from "./utils/axiosConfig";
// import guard from "./utils/guard";

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(VueCookie);

Vue.config.productionTip = false;


const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: dua},
        {path: '/deposer-une-annonce', component: HelloWorld},
        {path: '/inscription', name: 'inscription', component: inscription},
        {path: '/connexion', name: 'connexion', component: connexion}
    ]
});


axiosConfig(router);
// guard(router);
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
