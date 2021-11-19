import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import HelloWorld from "./components/HelloWorld";
import inscription from "./components/element/inscription";
import dua from "./components/home"

Vue.use(Buefy);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: dua},
        {path: '/deposer-une-annonce', component: HelloWorld},
        {path: '/inscription', component: inscription}
    ]
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
