const fs = require("fs");
const jwt = require("jsonwebtoken");
const refreshToken = require("./refreshToken");
module.exports = function checkToken(req, res, next) {
    const cert = fs.readFileSync('publicKey.pem');  // get public key
    const token = req.headers?.authorization?.split(' ')[1];
    const routeAuthorized = ['/users'];
    jwt.verify(token, cert, async function (err, decoded) {

        if (decoded || (routeAuthorized.includes(req.path) && req.method === "POST")) {
            next();
        } else {
            if (!decoded) {
                refreshToken(req, res, decoded).then(newTokens => {
                    req.headers['authorization'] = "Bearer " + newTokens.data.token;
                    req.headers["x-token-refresh"] = newTokens.data.refresh_token;
                    res.setHeader("Access-Control-Expose-Headers", 'authorization,x-token-refresh').setHeader("authorization", "Bearer " + newTokens.data.token)
                        .setHeader("x-token-refresh", newTokens.data.refresh_token);
                    next()
                }).catch(e => {
                    res.status(401);
                    res.json({message: 'Unauthorized, JWT Token not valid or missing'});
                });


            } else {
                res.status(401);
                res.json({message: 'Unauthorized, JWT Token not valid or missing'});
            }
        }
    });
};
