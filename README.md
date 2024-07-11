# CHALLENGE  

## build project from docker-compose.yaml 
```
docker-build up --build
```  
## open app in browser => http://localhost:4200


### TESTING CLIENT / DEFAULT ANGULAR Jasmine & Karma

```
cd client
```
```
npm install
```
```
npm test
```

### TESTING API / Jest & Supertest
**Importante** antes de testear detener el contenedor de la api si se esta ejecutando  
**Importante** ejecutar nuevamente la base de datos si no lo esta  

```
docker run -d -p 27017:27017 --name db mongo
```

```
cd api
```
```
yarn
```
```
yarn test
```
