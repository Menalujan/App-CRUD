import React, { Component } from 'react';

class CrearUsuario extends /*React.*/ Component{
    // this.props es objeto con datos públicos de React
    // this.state objeto con datos privados de React, es decir,
    // el estado interno del componente. Como en Angular
    // las variables miembro de la clase privadas

    constructor(props) {
        super(props);   // Invocamos al constructor del padre
                        // pasándole las propiedades públicas

        // Para el evitar el problema del this con JS
        // Con bind() hacemos que en el futuro, 
        // cuando se invoque al método,
        // this   sea realmente   this, es decir, el objeto instanciado
        // basado en clase, en estaso, cada uno de los componentes
        //TODO: Dejar limpios los campos
        this.state = {
            email: 'aaa@aaa.com',
            password: '1234',
            nombre: 'Mengano desde React'
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onSubmit = this.onSubmit.bind(this);      
    }
    onSubmit(evt) {
        evt.preventDefault();

        // Invocamos al servicio cliente HTTP, Ajax, fetch...
        console.log(`Datos: ${this.state.email} , ${this.state.nombre}`);
        window.fetch('http://127.0.0.1:4000/api/usuarios/registro', {
            method: 'post',
            body: JSON.stringify({
                "nombre": this.state.nombre,
                "email": this.state.email,
                "password": this.state.password
            }), 
            headers:{
              'Content-Type': 'application/json'
            }
        }).then( (res) => alert("Pues habrá ido bien"))
        .catch( (vacas) => "Pues habrá ido mal");
    }
    // Método invocado por React cada vez que se cambia el valor del <INPUT>
    // Se envia un objeto con la información del evento
    onChangeEmail(evt) {
        this.setState( {
            email: evt.target.value
        } );
    }
    onChangePassword(evt) {
        this.setState( {
            password: evt.target.value
        } );
    }
    onChangeNombre(evt) {
        this.setState( {
            nombre: evt.target.value
        } );
    }
    render() {
        return (
            <div>
                <h2>Formulario crear usuario</h2>
                <form onSubmit={ this.onSubmit }>
                    <div>
                        <label>Email: </label>
                        <input type="email"
                                placeholder="ejemplo@email.com"
                                value = { this.state.email }
                                onChange = { this.onChangeEmail }
                                />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password"
                                placeholder="L3tr4as y numeros"
                                onChange = { this.onChangePassword }
                               value={ this.state.password } />
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input type="text"
                                placeholder="¿Quién carajo eres?"
                                onChange = { this.onChangeNombre }
                               value={ this.state.nombre } />
                    </div>
                    <div>
                        <input type="submit" value="Registrar"/>
                    </div>
                </form>
            </div>
        );
    }
}
export default CrearUsuario;


