const fs = require("fs");
const jwt = require("jsonwebtoken");
const refreshToken = require("./refreshToken");
module.exports = function checkToken(req, res, next) {
    const cert = fs.readFileSync('publicKey.pem');  // get public key
    const token = req.headers?.authorization?.split(' ')[1]
    const routeAuthorized = ['/users', '/refresh_token']

    jwt.verify(token, cert, async function (err, decoded) {
        let newTokens = null;
        if (decoded || routeAuthorized.includes(req.path) && req.method === "POST") {

            if (decoded && req.headers.authorization && req.headers["x-token-refresh"]) {
                newTokens = await refreshToken(req, res, req.headers);
                res.setHeader("authorization", "Bearer " + newTokens.data.token)
                    .setHeader("x-token-refresh", newTokens.data.refresh_token)
            }
            next()
        } else {
            res.status(401)
            res.json({message: 'Unauthorized, JWT Token not valid or missing'})
        }
    });
}
