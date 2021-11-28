module.exports = {
    BASE_URL: "http://user-nginx",
    // USER MICROSERVICE
    user: {
        PORT: 7010,
        routes: {
            login: '/authentication_token',
            usersRoute: '/api/users',
        }
    }
}
