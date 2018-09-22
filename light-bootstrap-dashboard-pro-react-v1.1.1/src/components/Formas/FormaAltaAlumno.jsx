import React, { Component } from "react";
import {
    Row,
    Col,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Datetime from "react-datetime";
import Select from "react-select";

export class FormaAltaAlumno extends Component {
    render() {

        return (
            <Col md={12}>
                <Row>
                    <Col md={4}>
                        <ControlLabel>Matricula</ControlLabel>
                        <FormControl
                            name="matricula"
                            value={this.props.alumno.matricula}
                            placeholder="1303"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={4}>
                        <ControlLabel>Nombre</ControlLabel>
                        <FormControl
                            name="nombre"
                            value={this.props.alumno.nombre}
                            placeholder="Juan"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                    <Col md={4}>
                        <ControlLabel>Apellido P.</ControlLabel>
                        <FormControl
                            name="apellidoP"
                            value={this.props.alumno.apellidoP}
                            placeholder="Perez"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                    <Col md={4}>
                        <ControlLabel>Apellido M.</ControlLabel>
                        <FormControl
                            name="apellidoM"
                            value={this.props.alumno.apellidoM}
                            placeholder="Perez"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={4}>
                        <ControlLabel>Sexo</ControlLabel>
                        <Select
                            placeholder="Single Select"
                            name="sexo"
                            clearable={false}
                            value={this.props.alumno.sexo}
                            options={[{ label: "Masculino", value: 0 }, { label: "Femenino", value: 1 }]}
                            onChange={this.props.handleSexo}
                        />
                    </Col>
                    <Col md={4}>
                        <ControlLabel>Fecha de Nacimiento.</ControlLabel>
                        <FormControl
                            name="fechaDeNacimiento"
                            value={this.props.alumno.fechaDeNacimiento}
                            placeholder="dd/mm/yyyy"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                    <Col md={4}>
                        <ControlLabel>CURP.</ControlLabel>
                        <FormControl
                            name="curp"
                            value={this.props.alumno.curp}
                            placeholder="CURP"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={4}>
                        <ControlLabel>Escuela de Procedencia</ControlLabel>
                        <FormControl
                            name="escuelaDeP"
                            value={this.props.alumno.escuelaDEP}
                            placeholder="Escuela de Procedencia"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                    <Col md={4}>
                        <ControlLabel>Ciudad de Procedencia</ControlLabel>
                        <FormControl
                            name="ciudadDeP"
                            value={this.props.alumno.ciudadDeP}
                            placeholder="Escuela de Procedencia"
                            type="Text"
                            onChange={this.props.handleChange}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md={12}>
                        <Checkbox
                            number="1"
                            label="Familia Existente"
                            change={this.props.checkChange}
                        />
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default FormaAltaAlumno;
