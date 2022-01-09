const express = require('express');
const router = express.Router();
const axiosRequest = require('../middleware/requestAxios');
const microservice = require("../middleware/routeList");


// Login function
router.post('/', async function (req, res, next) {
        const url = microservice.login;
        const headers = {'Content-Type': 'application/json'};
        const responseAxios = await axiosRequest(url, req, res, headers);

        res.status(responseAxios.status);
        res.json(responseAxios.data);
    }
);

module.exports = router;


