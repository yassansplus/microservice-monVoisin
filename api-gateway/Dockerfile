FROM node:14-alpine

RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev libpng-dev git

WORKDIR /api-gateway

COPY package*.json .

RUN yarn install

COPY . /api-gateway/

EXPOSE 3000

CMD ["npm", "start"]



