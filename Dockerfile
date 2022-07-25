FROM node:lts-alpine
WORKDIR /app
COPY package.json ./
RUN npm install -g http-server
COPY . .
RUN npm run build
EXPOSE 8080:3000

