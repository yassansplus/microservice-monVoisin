const routeList = require('./routeList');
const axios = require("axios");
module.exports = async function (req, res, decoded) {
    try {
        if (decoded && req.headers.authorization && req.headers["x-token-refresh"]) {
            const url = routeList.refresh_token;
            const data = {refresh_token: req.headers["x-token-refresh"]};
            const newTokens = await axios.post(url, data);
            res.setHeader("authorization", "Bearer " + newTokens.data.token)
                .setHeader("x-token-refresh", newTokens.data.refresh_token)
        }

    } catch (e) {
        res.status(e.response.data.code).json(e.response.data.message);
    }
}
