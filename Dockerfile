FROM node:lts-alpine as builder

WORKDIR /app
COPY . .

WORKDIR /app/client
RUN yarn install
RUN yarn build

WORKDIR /app/server
RUN yarn install
RUN yarn build:tiny

FROM alpine
WORKDIR /app

COPY --from=builder /app/client/build /app/client
COPY --from=builder /app/server/build /app/server

RUN apk add postgres nginx
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

COPY ./docker/entrypoint.sh ./
ENTRYPOINT [ "entrypoint.sh" ]