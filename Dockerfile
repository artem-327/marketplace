# build environment
FROM node:11 as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm install --silent
RUN npm run build

# production environemnt
#FROM nginx:1.13-alpine
FROM nginx:1.15-alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY nginx/ssl-params.inc /etc/nginx/conf.d/ssl-params.inc

# copy builded files
COPY --from=builder /app/build /usr/share/nginx/html

# install Letsencrypt SSL certificates
#WORKDIR /root
## Godaddy hooks
#COPY nginx/authenticator_godaddy.sh /usr/local/bin/
#COPY nginx/cleanup_godaddy.sh /usr/local/bin/
#RUN chmod +x /usr/local/bin/authenticator_godaddy.sh
#RUN chmod +x /usr/local/bin/cleanup_godaddy.sh
## add needed tools
#RUN apk update
#RUN apk add certbot curl bind-tools libressl
## generate SSL secret
#RUN openssl dhparam -dsaparam -out /etc/nginx/dhparam.pem 4096
## setup periodical certs check
#COPY nginx/certbot-renew.sh /etc/periodic/weekly/
#RUN chmod +x /etc/periodic/weekly/certbot-renew.sh
## run it first time just now
#RUN /etc/periodic/weekly/certbot-renew.sh


