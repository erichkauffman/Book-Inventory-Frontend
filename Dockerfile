FROM node:11.12.0-alpine as build

WORKDIR /usr/src/app

COPY . ./

ARG REACT_APP_API_PATH

ARG REACT_APP_ENV

RUN yarn

RUN CI=true yarn test

RUN yarn build



FROM nginx:1.15.9-alpine

COPY --from=build /usr/src/app/build /var/www

COPY ./nginx/nginx.conf /etc/nginx/
