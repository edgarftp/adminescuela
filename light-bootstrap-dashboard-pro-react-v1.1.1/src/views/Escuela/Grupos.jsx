import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Form,
    InputGroup
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Select from "react-select";

import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Radio from "components/CustomRadio/CustomRadio.jsx";

class RegularForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciclos: [],
            niveles: [],
            grados: [],
            campus: [],
            aulas: [],
            profesores: [],
            grupos: [],
            ciclosOpt: "",
            nivelesOpt: "",
            gradosOpt: "",
            campusOpt: "",
            aulasOpt: "",
            profesoresOpt: [],
            gruposVal: ""

        };
    }

    handleOnChange = (e) => {
        const name = e.target.name + "Val";
        this.setState({ [name]: e.target.value });
    };

    handleEnter = (e) => {
        if (e.key === "Enter") {
            this.handleSubmit(e.target.name);
        }
    };

    handleSubmit = () => {
        this.setState({ grupos: [...this.state.grupos, this.state.gruposVal] });
        this.setState({ gruposVal: "" });
    };

    render() {
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Agregar Grupos"
                            content={
                                <Row>
                                    <Row>
                                        <Col md={12}>
                                            <Col md={2}>
                                                <legend>Ciclo</legend>
                                                <Select
                                                    placeholder="Ciclo Escolar"
                                                    name="ciclos"
                                                    value={this.state.ciclosOpt}
                                                    options={this.state.ciclos}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
                                                    }
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <legend>Nivel</legend>
                                                <Select
                                                    placeholder="Nivel Académico"
                                                    name="niveles"
                                                    value={this.state.nivelesOpt}
                                                    options={this.state.niveles}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
                                                    }
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <legend>Grado</legend>
                                                <Select
                                                    placeholder="Grado"
                                                    name="grados"
                                                    value={this.state.gradosOpt}
                                                    options={this.state.grados}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
                                                    }
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <legend>Campus</legend>
                                                <Select
                                                    placeholder="Campus"
                                                    name="campus"
                                                    value={this.state.campusOpt}
                                                    options={this.state.campus}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
                                                    }
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <legend>Aula</legend>
                                                <Select
                                                    placeholder="Aula"
                                                    name="aulas"
                                                    value={this.state.aulasOpt}
                                                    options={this.state.aulas}
                                                    onChange={value =>
                                                        this.setState({ singleSelect: value })
                                                    }
                                                />
                                            </Col>
                                        </Col>
                                    </Row>
                                    <br />
                                    <br />
                                    <Row>
                                        <Col md={12}>
                                            <Col md={4}>
                                                <legend>Profesores</legend>
                                                <Select
                                                    placeholder="Profesores"
                                                    closeOnSelect={false}
                                                    multi={true}
                                                    name="profesores"
                                                    value={this.state.profesoresOpt}
                                                    options={this.state.profesores}
                                                    onChange={value => {
                                                        this.setState({ multipleSelect: value });
                                                    }}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <legend>Grupo</legend>
                                                <FormControl
                                                    name="grupos"
                                                    onChange={this.handleOnChange}
                                                    value={this.state.gradosVal}
                                                    onKeyUp={this.handleEnter}
                                                    placeholder="A"
                                                    type="Text"
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Button onClick={this.handleSubmit} bsStyle="info" fill>
                                                    Agregar
                                                </Button>
                                            </Col>


                                        </Col>
                                    </Row>
                                </Row>
                            }
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RegularForms;
