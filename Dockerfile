FROM nginx:1.17.3-alpine

COPY ./dist/Frontend /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY /favicon.ico /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
