import React, { Component } from "react";
import {
    Row,
    Col,
    ControlLabel,
    FormControl
} from "react-bootstrap";


export class FormaAltaFamilia extends Component {
    render() {
      
        return (
            <Row>
                <Col md={12}>
                    <Row>
                        <Col md={12}>
                            <Col md={12}>
                                <legend> Datos del Padre</legend>
                            </Col>
                            <Col md={3}>
                                <ControlLabel>Nombre</ControlLabel>
                                <FormControl
                                    name={"nombrePadre"}
                                    value={this.props.familia.nombrePadre}
                                    placeholder="Juan Perez"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Celular</ControlLabel>
                                <FormControl
                                    name="celPadre"
                                    value={this.props.familia.celPadre}
                                    placeholder="8999123456"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Tel. Oficina</ControlLabel>
                                <FormControl
                                    name="oficinaPadre"
                                    value={this.props.familia.oficinaPadre}
                                    placeholder="8999123456"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Empleo</ControlLabel>
                                <FormControl
                                    name="trabajoPadre"
                                    value={this.props.familia.trabajoPadre}
                                    placeholder="EmpresaX"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    name="emailPadre"
                                    value={this.props.familia.emailPadre}
                                    placeholder="papa@gmail.com"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={12}>
                            <Col md={12}>
                                <legend> Datos de la Madre</legend>
                            </Col>
                            <Col md={3}>
                                <ControlLabel>Nombre</ControlLabel>
                                <FormControl
                                    name={"nombreMadre"}
                                    value={this.props.familia.nombreMadre}
                                    placeholder="María Perez"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Celular</ControlLabel>
                                <FormControl
                                    name="celMadre"
                                    value={this.props.familia.celMadre}
                                    placeholder="8999123456"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Tel. Oficina</ControlLabel>
                                <FormControl
                                    name="oficinaMadre"
                                    value={this.props.familia.oficinaMadre}
                                    placeholder="8999123456"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Empleo</ControlLabel>
                                <FormControl
                                    name="trabajoMadre"
                                    value={this.props.familia.trabajoMadre}
                                    placeholder="EmpresaX"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                            <Col md={2}>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    name="emailMadre"
                                    value={this.props.familia.emailMadre}
                                    placeholder="mama@gmail.com"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={12}>
                            <Col md={2}>
                                <ControlLabel>Tel. de Casa</ControlLabel>
                                <FormControl
                                    name="telCasa"
                                    value={this.props.familia.telCasa}
                                    placeholder="8999123456"
                                    type="Text"
                                    onChange={this.props.handleChangeFamilia}
                                    readOnly={this.props.checkFamilia}
                                />
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row >
        );
    }
}

export default FormaAltaFamilia;
