FROM node:19-alpine3.15

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]