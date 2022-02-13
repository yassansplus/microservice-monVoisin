var express = require('express');
const axiosRequest = require("../middleware/requestAxios");
const routes = require("../middleware/routeList");
var router = express.Router();
const authentication = require("../middleware/authentication");
const axios = require('axios');
const stripe = require('stripe')('sk_test_a4UyHJtqW30KzDXk24LsoaIZ');

router.get('/', async function (req, res, next) {
    res.json('ok')

});

router.post('/', async function (req, res, next) {
    const prix = req.body.room.annonce.prix;
    const paymentIntents = await stripe.paymentIntents.create({
        amount: prix * 100, // $25
        currency: 'eur',
    });
    res.json(paymentIntents)


});

module.exports = router;
