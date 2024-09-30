FROM node:20-alpine AS base

WORKDIR /user/app

COPY package.json package-lock.json ./  

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm","run","dev"]