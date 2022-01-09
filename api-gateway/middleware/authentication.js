const fs = require("fs");
const jwt = require("jsonwebtoken");
const refreshToken = require("./refreshToken");
module.exports = function checkToken(req, res, next) {
    const cert = fs.readFileSync('publicKey.pem');  // get public key
    const token = req.headers?.authorization?.split(' ')[1];
    const routeAuthorized = ['/users'];

    jwt.verify(token, cert, async function (err, decoded) {

        if (decoded || (routeAuthorized.includes(req.path) && req.method === "POST")) {
            if (!(routeAuthorized.includes(req.path) && req.method === "POST")) {
                req.headers['authorization'] = "Bearer " + token;
                res.setHeader("Access-Control-Expose-Headers", 'authorization').setHeader("authorization", null)
                    .setHeader("x-token-refresh", null);
            }

            next();
        } else {
            if (!decoded) {
                refreshToken(req, res, decoded).then(newTokens => {
                    req.headers['authorization'] = "Bearer " + newTokens.data.token;
                    req.headers["x-token-refresh"] = newTokens.data.refresh_token;
                    res.setHeader("Access-Control-Expose-Headers", 'authorization,x-token-refresh').setHeader("authorization", newTokens.data.token)
                        .setHeader("x-token-refresh", newTokens.data.refresh_token);
                    next()
                }).catch(() => {
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
