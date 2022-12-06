FROM node:14-alpine 
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000:3001

CMD ["node", "dist/main.js"]

