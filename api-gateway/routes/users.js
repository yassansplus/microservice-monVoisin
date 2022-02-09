const express = require('express');
const router = express.Router();
const routes = require('../middleware/routeList');
const routeUser = routes.user;
const axiosRequest = require('../middleware/request');

// Login function
router.post('/login', async function (req, res, next) {
        const url = routes.BASE_URL + routeUser.routes.login;
        const headers = {'Content-Type': 'application/json'};
        const response = await axiosRequest(url, req, res, headers);
        res.status(response.status);
        res.json(response.data);
    }
)
// TODO: Regarder pourquoiil ya base_url
router.post('/', async function (req, res, next) {
        const url = routes.BASE_URL + routeUser.routes.usersRoute;
        const headers = {'Content-Type': 'application/json'};
        const response = await axiosRequest(url, req, res, headers);
        res.status(response.status);
        res.json(response.data);
    }
)

// /* GET all users */
router.get('/', async function (req, res, next) {
        const url = routes.BASE_URL + routeUser.routes.usersRoute;
        const response = await axiosRequest(url, req, res, req.headers);
        res.status(response.status);
        res.json(response.data);


    }
);


module.exports = router;


