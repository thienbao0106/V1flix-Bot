FROM node:18
WORKDIR /app
COPY package.*.json ./
RUN yarn install
RUN yarn global add nodemon
COPY . .
EXPOSE 8080
CMD ["yarn", "dev"]