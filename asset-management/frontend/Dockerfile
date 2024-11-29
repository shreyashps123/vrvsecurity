FROM node:21-alpine3.20 AS builder
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]