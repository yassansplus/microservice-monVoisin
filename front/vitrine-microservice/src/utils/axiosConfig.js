import axios from "axios";
import VueCookie from "vue-cookie";

export default function (router) {

    axios.interceptors.response.use(function (response) {
        if (response.headers?.authorization !== "null") {
            if (response.headers?.authorization !== undefined) {
                VueCookie.set('token', response.headers?.authorization);
                VueCookie.set('refresh_token', response.headers['x-token-refresh']);
            }
        }
        return response;
    }, function (error) {
        if (router.currentRoute.name !== 'connexion' || router.currentRoute.name !== 'inscription') {
            return router.push('/connexion')
        }
        return Promise.reject(error);
    });
    axios.interceptors.request.use(
        config => {
            config.headers.Accept = 'application/json';
            config.headers['x-token-refresh'] = VueCookie.get('refresh_token');
            config.headers.Authorization = 'Bearer ' + VueCookie.get('token');
            return config
        },
        error => {
            return Promise.reject(error);
        });
}
