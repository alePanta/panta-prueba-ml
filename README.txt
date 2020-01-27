Como levantar la aplicación en ambiente de desarrollo

Para levantar el server:
En la linea de comando ir al directorio be y ejecutar:

npm i
npm run start

El server se levanta en el puerto 5000

Para levantar el front-end en Angular:
En la linea de comando ir a la carpeta fe/prueba-ml y ejecutar:

npm i
ng serve

La aplicacion Angular se levanta el puerto 4200, ir a http://localhost:4200/
En el archivo angular.json esta configurado el proxy para conectar con el puerto 5000 donde esta el server

Version:
Node v12.14.1
Angular 8

