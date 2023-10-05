FROM node:18
WORKDIR /app
COPY package.*.json ./
RUN yarn install
RUN yarn global add nodemon
RUN yarn global add ts-node
RUN yarn global add typescript
RUN yarn global add dotenv
RUN yarn global add discord.js
RUN yarn global add axios


COPY . .
EXPOSE 8080
CMD ["yarn", "dev"]