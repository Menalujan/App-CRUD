const express = require('express');
const bodyParser = require('body-parser');
//TODO: importar y usar módulo middle-ware CORS
const cors = require('cors');
const mongoose = require('mongoose');
const Usuario = require('./modelo');

const app = express();
const PORT = 4000;  // Constantes de verdad se ponen
                    // siempre con mayúsculas

// Software intermediario para la serializacion y
// deserialización (parseo) automática
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/db_usuarios');
const conexion = mongoose.connection;
// once() es lo mismo que addEventListener()
conexion.once("open", function() {
    console.log(" 0) - ¡Eureka hemos conectao Mongoose!")
});

app.listen( PORT, 
    function() {
        console.log(" 1) - Servidor ejecutandose en " + PORT);
    });

const rutasAPI = express.Router();
// Y este obj va a hacer de intermediario en url /api/usuarios
app.use("/api/usuarios", rutasAPI);
// http://127.0.0.1:4000/api/usuarios/registro   método POST

function recibirRegistroPost(peticionHttp, respuestaHttp) {
    console.log(" 2) - La petición HTTP empieza a ser procesada");
    // Deberíamos recibir un JSON con el nuevo usuario
    // Así que creamos un objeto Schema y le pasamos el JSON ya 
    // convertido en objeto de JS gracias al bodyParser
    let nuevoUsuario = new Usuario( peticionHttp.body );
    let promesaDeGuardado = nuevoUsuario.save();
    promesaDeGuardado.then( usuario => {
        console.log(" 4) - Se ha registrado en bbdd");
        respuestaHttp.status(200).json({
            "usuario": "Creado satisfactoriamente"
        })
    } );
    promesaDeGuardado.catch( error => {
        console.log(" 4) - El registro ha fallao");
        respuestaHttp.status(400).send("El registro ha fallao");
    } );
    console.log(" 3) - La petición HTTP ha sido procesada");
}

rutasAPI.route("/registro").post(recibirRegistroPost);

rutasAPI.route("/").get(function (reqPeticionHttp, resRespuestaHttp) {
    // Pide tooooda la colección e invoca a esta callback con ella y el error
    // Invoca a la query de Mongo db.usuarios.find()
    Usuario.find( function(err, coleccionUsarios) {
        if (err) {
            console.log(err);
        } else {
            // Pedimos devolver la colleción en formato JSON 
            resRespuestaHttp.json(coleccionUsarios);
        }
    } ); 
});

console.log(" 1.2) - El script principal ha terminado ");

rutasAPI.route("/:id").delete(function(req,res) {
    Usuario.findById(req.params.id).remove().exec();
});