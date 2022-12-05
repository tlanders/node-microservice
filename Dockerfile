FROM node:16.15-alpine3.16

# directory in image
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src

EXPOSE 3001
CMD npm start
