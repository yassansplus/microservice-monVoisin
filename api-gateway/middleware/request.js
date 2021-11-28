const axios = require("axios");
module.exports = async function (url, req, res) {
    try {
        const data = req.body;
        const method = req.method;
        let headers = url.split("/");
        headers = headers[headers.length - 1] === 'authentication_token' ? {
            'Content-Type': 'application/json'
        } : req.headers;

        console.log(method, url, req.headers);
        return await axios({
            method,
            url,
            headers: headers,
            data
        })

    } catch (e) {
        //  console.log(e)
        res.status(e.response.status)
        res.json(e.response.statusText)
    }
}
