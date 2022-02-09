var express = require('express');
const axiosRequest = require("../middleware/requestAxios");
const routes = require("../middleware/routeList");
var router = express.Router();


router.get('/', async function (req, res, next) {
    let headers = {'Content-Type': 'application/json'};

    let annonces = await axiosRequest(routes.home, req, res, headers);
    for (const annonce of annonces.data["hydra:member"]) {
        const user = await axiosRequest(routes.users + '/' + annonce.userId, req, res, headers);
        annonce.user = user.data;
    }
    res.json(annonces.data["hydra:member"]);
});


/* GET users listing. */
router.get('/:id', async function (req, res, next) {

    const userId = req.params.id;
    let headers = {'Content-Type': 'application/json'};
    if (req.headers.authorization) headers = {...headers, "Authorization": req.headers.authorization};
    const user = await axiosRequest('http://localhost:3000/users/' + userId, req, res, headers);
    const annonce = await axiosRequest('http://localhost:3000/users/' + userId, req, res, headers);
    res.json({user: user.data, annonce: annonce.data})
});

module.exports = router;
