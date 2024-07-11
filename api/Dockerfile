FROM node:alpine AS build

WORKDIR /

COPY package.json yarn.lock ./
RUN yarn


COPY . .
RUN yarn build

FROM node:alpine

WORKDIR /

COPY package.json yarn.lock ./
COPY --from=build /dist ./dist
RUN yarn

EXPOSE 3000
    
CMD ["node", "dist/app.js"]
