FROM node:alpine AS build

WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install 


COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY . .
COPY --from=build /app/dist/client/browser/ /app/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
