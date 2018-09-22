import React, { Component } from "react";
import {
    Row,
    Col,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";


export class LecturaAlumno extends Component {
    render() {
        return (
            <Col md={12}>
                <Row>
                    <Col md={2}>
                        <ControlLabel>Matricula</ControlLabel>
                        <FormControl
                            name="matricula"
                            value={this.props.alumno.matricula}
                            placeholder=""
                            type="Text"
                            readOnly={true}
                        />
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                            name="nombre"
                            value={this.props.alumno.nombre}
                            placeholder=""
                            type="Text"
                            readOnly={true}
                        />
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Apellido P.</ControlLabel>
                        <FormControl
                            name="apellidoP"
                            value={this.props.alumno.apellidoP}
                            placeholder=""
                            type="Text"
                            readOnly={true}
                        />
                    </Col>
                    <Col md={3}>
                        <ControlLabel>Apellido M.</ControlLabel>
                        <FormControl
                            name="apellidoM"
                            value={this.props.alumno.apellidoM}
                            placeholder=""
                            type="Text"
                            readOnly={true}
                        />
                    </Col>
                    <Col md={1}>
                        <ControlLabel> Cambiar</ControlLabel>
                        <Button onClick={()=>this.props.cambiarAlumno("alumnos")} simple bsStyle="info" fill>
                            <i className= "fa fa-arrow-left" />
                        </Button>
                        
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default LecturaAlumno;
