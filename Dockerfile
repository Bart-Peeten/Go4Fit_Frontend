FROM nginx:1.17.3-alpine

COPY ./dist/Frontend /usr/share/nginx/html
#COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
