// import store from '../store';
// import VueCookie from "vue-cookie";

export default function (router) {

    router.beforeEach((to, from, next) => {
        return next();
        // if (to.name === 'inscription' || to.name === 'connexion') {
        //     return next();
        // } else {
        //
        //     if (VueCookie.get('user')) {
        //         if (store.state.user === undefined) {
        //             store.commit('setUser', VueCookie.get('user'));
        //         }
        //         return next();
        //     }
        //     return next({name: "connexion"})
        //
        // }


    });
}
