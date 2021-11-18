import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import HelloWorld from "./components/HelloWorld";
import dua from "./components/deposer-une-annonce"
Vue.use(Buefy);
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: dua},
        {path: '/deposer-une-annonce', component: HelloWorld}
    ]
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
