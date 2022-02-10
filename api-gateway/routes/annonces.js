var express = require('express');
const axiosRequest = require("../middleware/requestAxios");
const routes = require("../middleware/routeList");
var router = express.Router();
const authentication = require("../middleware/authentication");


router.get('/', async function (req, res, next) {
    let headers = {'Content-Type': 'application/json'};

    let annonces = await axiosRequest(routes.home, req, res, headers);
    for (const annonce of annonces.data["hydra:member"]) {
        const user = await axiosRequest(routes.users + '/' + annonce.userId, req, res, headers);
        annonce.user = user.data;
    }
    res.json(annonces.data["hydra:member"]);
});


router.get('/:id', authentication, async function (req, res, next) {

    let headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};
    let routeAnnonce = routes.home + "?userId=" + req.params.id;
    let annonces = await axiosRequest(routeAnnonce, req, res, headers);
    for (const annonce of annonces.data) {
        const user = await axiosRequest(routes.users + '/' + req.params.id, req, res, headers);
        annonce.user = user.data;
    }
    res.json(annonces.data);
});

module.exports = router;
