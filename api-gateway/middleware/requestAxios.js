const axios = require("axios");
module.exports = async function (url, req, res, headers) {
    try {
        console.log(url);
        const data = req.body;
        const method = req.method;
        return await axios({
            method,
            url,
            headers,
            data
        })

    } catch (e) {
        res.status(e.response.status);
        return res.json(e.response.data)
    }
};
