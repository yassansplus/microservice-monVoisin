const microservice = require("./routeList");
const axiosRequest = require('./requestAxios');
module.exports = async (req, res) => {
    // On split pour récuperer les différents paramètres de notre routes
    const params = req.params['0'].split('/');
    params.forEach((e, index) => e.length === 0 ? params.splice(index, 1) : e);
    if (params.length <= 2) {
        let url = params.length === 1 ? microservice[params[0]] : microservice[params[0]] + '/' + params[1];
        let headers = req.headers;
        console.log(url);
        if (params[0] === 'users' && req.method === "POST") {
            headers = {'Content-Type': 'application/json'};
        }
        const response = await axiosRequest(url, req, res, headers);
        res.status(response.status);
        res.json(response.data);
    }
};
