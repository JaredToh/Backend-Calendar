
const express=require('express');
require('dotenv').config();
const {coneccion}=require('./dataBase/config');
const cors=require('cors')

//crear el servidor
const app=express();


//base de datos
coneccion();

//CORS
app.use(cors());

//muestra el main
app.use(express.static('public'))


//leee y parseo del body
app.use(express.json())


//escuchar peticiones

app.use('/api/auth', require('./routers/auth'));
app.use('/api/events', require('./routers/events'));

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})