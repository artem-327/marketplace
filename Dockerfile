FROM node:9.11 as build

WORKDIR /app
COPY . .
RUN yarn install --prod
RUN yarn build

FROM nginx:1.13-alpine

COPY --from=build /app/build /usr/share/nginx/html