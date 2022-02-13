var express = require('express');
const axiosRequest = require("../middleware/requestAxios");
const routes = require("../middleware/routeList");
var router = express.Router();
const authentication = require("../middleware/authentication");
const axios = require('axios');

router.get('/', async function (req, res, next) {
    let headers = {
        'Content-Type': 'application/json', 'Accept': 'application/json' +
            ''
    };
    console.log('test');
    const rooms = await axiosRequest("http://chat-nginx/api" + req.originalUrl, req, res, headers);
    res.json(rooms.data);

});

router.get('/my-rooms', async function (req, res, next) {
    let headers = {
        'Content-Type': 'application/json', 'Accept': 'application/json' +
            ''
    };
    const currentUserId = req.query['secondParticipant'];
    const rooms = await axiosRequest("http://chat-nginx/api/rooms?secondParticipant=" + currentUserId, req, res, headers);
    for (let room of rooms.data) {
        const userAuthor = await axiosRequest(routes.users + "/" + room.firstParticipant, req, res, headers);
        const annonce = await axiosRequest(routes.annonces + "/" + room.annonceTitle, req, res, headers);
        room.author = userAuthor.data;
        room.annonce = annonce.data;
    }

    res.json(rooms.data);

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
