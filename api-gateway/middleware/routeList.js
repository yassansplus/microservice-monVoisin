module.exports = {

    // USER MICROSERVICE
    login: "http://user-nginx/authentication_token",
    users: "http://user-nginx/api/users",
    refresh_token: "http://user-nginx/api/token/refresh",
    categories: "http://annonce-nginx/api/categories",
    annonces: "http://annonce-nginx/api/annonces",
    home: "http://annonce-nginx/api/annonces",
    chats: "http://chat-nginx/api/messages",
    rooms: "http://chat-nginx/api/rooms",
};

