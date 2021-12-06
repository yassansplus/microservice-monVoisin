const microservice = require("./routeList");
const axiosRequest = require('./requestAxios');
module.exports = async (req, res, next) => {
    // On split pour récuperer les différents paramètres de notre routes
    const params = req.params['0'].split('/');
    // On supprime les éléments vide -> ''

    //TODO: PENSER A SUPPRIMER LE HEADERS QUAND LE FRONT SERA FONCTIONNEL
    params.forEach((e, index) => e.length === 0 ? params.splice(index, 1) : e);
    let headers = {'Content-Type': 'application/json'};
    if (req.headers.authorization) headers = {...headers, "Authorization": req.headers.authorization};
    if (params.length <= 2) {
        let url = params.length === 1 ? microservice[params[0]] : microservice[params[0]] + params[1];
        const response = await axiosRequest(url, req, res, headers);
        // console.log(res)
        res.status(response.status)
        res.json(response.data)
    }
}
