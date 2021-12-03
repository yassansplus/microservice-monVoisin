const fs = require("fs");
const jwt = require("jsonwebtoken");
module.exports = function checkToken(req, res, next) {
    const cert = fs.readFileSync('publicKey.pem');  // get public key
    const token = req.headers?.authorization?.split(' ')[1]
    const routeAuthorized = ['/users', '/refresh_token']

    jwt.verify(token, cert, function (err, decoded) {
        if (decoded || routeAuthorized.includes(req.path) && req.method === "POST") {
            console.log(req.headers['x-refresh-token'])
            next();
        } else {
            res.status(401)
            res.json({message: 'Unauthorized, JWT Token not valid or missing'})
        }
    });
}
