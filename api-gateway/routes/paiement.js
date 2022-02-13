const express = require('express');
const routes = require("../middleware/routeList");
const router = express.Router();
const axios = require('axios');
const axiosRequest = require("../middleware/requestAxios");
const stripe = require('stripe')('sk_test_a4UyHJtqW30KzDXk24LsoaIZ');

router.get('/', async function (req, res, next) {
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    console.log(req.originalUrl);
    const rooms = await axiosRequest("http://paiement-nginx/api" + req.originalUrl, req, res, headers);
    res.json(rooms.data);
});

router.post('/', async function (req, res, next) {
    const prix = req.body.room.annonce.prix;
    console.log(req.body);
    const paymentIntents = await stripe.paymentIntents.create({
        amount: prix * 100, // $25
        currency: 'eur',
    });
    res.json(paymentIntents)
});
router.post('/success', async function (req, res, next) {
    const headers = {"Content-type": 'Application/json'};
    console.log(req.body);
    req.body.payeAt = new Date().toDateString();
    console.log(req.body);
    const newPaiement = await axios.post(routes.paiement, req.body, headers);
    res.json(newPaiement.data);


});

module.exports = router;
