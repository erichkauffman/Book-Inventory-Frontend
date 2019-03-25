FROM nginx:1.15.9-alpine

COPY ./build /var/www

COPY ./nginx/nginx.conf /etc/nginx/

EXPOSE 1234
