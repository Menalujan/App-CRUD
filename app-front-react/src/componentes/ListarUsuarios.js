import React, { Component } from 'react';

class ListarUsuarios extends /*React.*/ Component{

    // Equivalente al ngOnInit(): El componente ha sido montado
    componentDidMount() {
        this.setState(null);  // Aunque es redundante

        let promesaHTTP = window.fetch('http://127.0.0.1:4000/api/usuarios/');
        promesaHTTP.then(   (resHTTP) => {
            let promesaJSON = resHTTP.json();
            
            promesaJSON.then( (objColeccionUsu) => {
                console.log( JSON.stringify(objColeccionUsu) );
                // Cuando por fin recibimos la coleccion y ha sido convertida en JSON
                this.setState( {
                    listaUsuarios: objColeccionUsu
                });
            } );
        });
    }
    componentWillUnmount () { 
        // Esto se ejecuta cuando se desmonte el componente
    }

    render() {
        let objViDomJSX;
        //TODO: Condicional, si this.state no existe, mostramos "Cargando..."
        if (this.state === null ) {
            objViDomJSX = (<p>Cargando...</p> );
        } else {
            /*let contIds = 1;
            let filasTr = this.state.listaUsuarios.map( (usu) => {
                contIds++;
                return ( <tr  key={ contIds }>
                            <td>{ usu.nombre }</td>
                            <td>{ usu.email }</td>
                         </tr> );
            } );*/
            objViDomJSX = (
                <div>
                    <h2>Lista de usuarios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        {   this.state
                                .listaUsuarios
                                .map( usu =>  ( 
                                          <tr  key={ usu._id }>
                                            <td>{ usu.nombre }</td>
                                            <td>{ usu.email }</td>
                                            <td> <input type='button' value='Eliminar'/></td>
                                            <td> <input type='button' value='Modificar'/></td>
                                          </tr> 
                                ) ) }
                        </tbody>
                    </table>
                </div>
            );
        }

        return objViDomJSX;
    }
}
export default ListarUsuarios;