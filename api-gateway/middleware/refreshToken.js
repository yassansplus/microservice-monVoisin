const routeList = require('./routeList');
const axios = require("axios");
module.exports = async function (req, res, next) {
    try {
        if ((req.headers["x-token-refresh"] !== null || req.headers["x-token-refresh"] !== undefined)
            && req.headers["x-token-refresh"].length > 0) {
            const url = routeList.refresh_token;
            const data = {refresh_token: req.headers["x-token-refresh"]};
            return axios.post(url, data);
        }

    } catch (e) {
        let status;
        let message;
        if (e.response.data.code) {
            status = e.response.data.code;
            message = e.response.data.message
        } else {
            status = e.response.status;
            message = e.response.data.detail;
        }
        res.status(status).json({message});
    }
};
