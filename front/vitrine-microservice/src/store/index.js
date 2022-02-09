import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: undefined,
        notAuthorized: null
    },
    mutations: {
        setUser(state, user) {
            state.user = JSON.parse(user)
        },
        setAuthorizationMessage(state, message) {
            state.notAuthorized = message
        }
    }
})
