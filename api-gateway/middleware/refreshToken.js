const routeList = require('./routeList');
const axios = require("axios");
module.exports = async function (req, res) {
    try {
        const url = routeList.refresh_token;
        const data = {refresh_token: req.headers["x-token-refresh"]};
        return await axios.post(url, data);
    } catch (e) {
        res.status(e.response.data.code).json(e.response.data.message);
    }
}
