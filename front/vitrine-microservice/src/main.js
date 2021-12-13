import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import HelloWorld from "./components/HelloWorld";
import inscription from "./components/pages/inscription";
import dua from "./components/pages/home"
import connexion from "./components/pages/connexion";
import VueCookie from 'vue-cookie';
import axios from 'axios';
import routeList from './entity/routeList'

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.use(VueCookie)

Vue.config.productionTip = false


const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: dua},
        {path: '/deposer-une-annonce', component: HelloWorld},
        {path: '/inscription', name: 'inscription', component: inscription},
        {path: '/connexion', name: 'connexion', component: connexion}
    ]
})


router.beforeEach((to, from, next) => {

    if (to.name === 'inscription' || to.name === 'connexion') {
        return next();
    } else {

        const headers = {
            'authorization': localStorage.token,
            'x-token-refresh': localStorage.refresh_token
        }
        axios.get(routeList.checkjwt, {headers}).then(res => {
            localStorage.token = res.headers.authorization;
            localStorage.refresh_token = res.headers["x-token-refresh"];
            return next()
        }).catch(e => {
            console.log(e.response.data)
            return next({name: "connexion"})
        });


    }


})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
