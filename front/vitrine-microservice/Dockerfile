FROM node:14-alpine
# envoie des fichiers de notre environnement vers la VM
RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev libpng-dev git

WORKDIR /vue-annonce

COPY package*.json ./

RUN yarn install

COPY . /vue-annonce/

EXPOSE 8080

CMD ["yarn","serve"]
