FROM node:12.16.1 as build-stage

ENV NODE_ENV=production
RUN mkdir -p /var/app
COPY --chown=node:node "." "/var/app"
WORKDIR /var/app
RUN npm install --production && npm run build

FROM nginx:1.15

COPY --from=build-stage /var/app/build/ /usr/share/nginx/html
COPY --from=build-stage /var/app/Docker/nginx/nginx.conf /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /usr/share/nginx/html