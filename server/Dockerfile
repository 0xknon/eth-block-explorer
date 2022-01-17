FROM node:latest AS installer

RUN mkdir -p /usr/srv
WORKDIR /usr/srv
COPY . .

RUN yarn && yarn build

EXPOSE 3000
# CMD [ "yarn", "start" ]
