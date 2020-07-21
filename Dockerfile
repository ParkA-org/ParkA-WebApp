FROM node:11-alpine AS builder

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

RUN npm run build


FROM node:11-alpine

WORKDIR /usr/src

COPY --from=builder /usr/src .

EXPOSE 3000 

CMD ["node_modules/.bin/next" , "start"]