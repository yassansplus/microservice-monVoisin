import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import deposerUneAnnonce from "./components/pages/deposer-une-annonce";
import inscription from "./components/pages/inscription";
import profil from "./components/pages/profil"
import annonces from "./components/pages/annonces";
import annonce from "./components/pages/annonce";
import roomsList from './components/pages/rooms-list';
import paiement from './components/pages/paiement';
import chat from './components/pages/chat';
import transactions from './components/pages/transactions'
import connexion from "./components/pages/connexion";
import VueCookie from 'vue-cookie';
import store from './store';
import {StripePlugin} from "@vue-stripe/vue-stripe";
import axiosConfig from "./utils/axiosConfig";
// import guard from "./utils/guard";

const options = {
    pk: "pk_test_ctOM1rGg5iY3uVYncdVEO4EC",
    locale: "fr",
};

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(StripePlugin, options);
Vue.config.productionTip = false;


const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', name: "home", component: annonces},
        {path: '/deposer-une-annonce', component: deposerUneAnnonce},
        {path: '/inscription', name: 'inscription', component: inscription},
        {path: '/connexion', name: 'connexion', component: connexion},
        {path: '/profil', name: 'profil', component: profil},
        {path: '/mes-annonces', name: 'mes-annonces', component: annonces},
        {path: '/mes-annonces/:id', name: 'mon-annonce', component: annonce},
        {path: '/annonce/:id', name: 'annonce', component: annonce},
        {path: '/mes-demandes', name: 'mes-demandes', component: roomsList},
        {path: '/mes-transactions', name: 'mes-transactions', component: transactions},
        {path: '/chat', name: 'chat', component: chat, props: true},
        {path: '/paiement', name: 'paiement', component: paiement, props: true}
    ]
});


axiosConfig(router);
// guard(router);
store.commit('setUser', VueCookie.get('user'));
if (VueCookie.get('token')) {
    VueCookie.set('user', atob(VueCookie.get('token').split(".")[1]))
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
