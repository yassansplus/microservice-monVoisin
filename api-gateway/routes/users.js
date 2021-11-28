const express = require('express');
const router = express.Router();
const routes = require('./routeList')
const routeUser = routes.user;
const axiosRequest = require('../middleware/request')
const authentication = require('../middleware/authentication')
const axios = require("axios");

// Login function
router.post('/login', async function (req, res, next) {
        const url = routes.BASE_URL + routeUser.routes.login;
        const response = await axiosRequest(url, req, res);
        res.status(response.status)
        res.json(response.data)
    }
)

// /* GET all users */
router.get('/', async function (req, res, next) {
        const url = routes.BASE_URL + routeUser.routes.getUsers;
        const response = await axiosRequest(url, req, res);
        res.status(response.status)
        res.json(response.data)


    }
)
// router.get('/:id', (req, res) => {
//     res.json(req.params.id);
// })


module.exports = router;

async function testAxios(url, req, res) {
    try {
        const data = req.body;
        const method = req.method;

        const result = await axios({
            method,
            url,
            headers: "{'Content-Type': 'application/json}",
            data
        })
        console.log(result);

    } catch (e) {
        //  console.log(e)
        res.json(e)
    }
}
