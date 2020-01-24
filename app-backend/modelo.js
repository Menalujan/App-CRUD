const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: Validaciones de campos en BBDD. ¡OBLIGATORIO!
let Usuario = new Schema( {
    email: {
        type: String    // String en mayúsc porque es el tipo/clase
    },
    password: {
        type: String
    },
    nombre: {
        type: String
    }
} );
// Como el export default pero para Node ...
module.exports = mongoose.model('Usuario', Usuario);
