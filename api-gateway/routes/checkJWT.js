var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
    res.json(true);
});

module.exports = router;
