import React, { Component } from "react";
export class ConfirmarInsc extends Component{
    render(){
        return(
            <div>
                <h5>{this.props.alumno.nombre + " " + this.props.alumno.apellidoP + " " + this.props.alumno.apellidoM}</h5>
                <h5>Ciclo Escolar: {this.props.grupo.ciclo_name}</h5>
                <h5>Nivel: {this.props.grupo.nivel_name}</h5>
                <h5>Grupo: {this.props.grupo.grado_name + this.props.grupo.grupo}</h5>
                <h5>Campus: {this.props.grupo.campus_name}</h5>
            </div>
        );
    }
}

export default ConfirmarInsc;