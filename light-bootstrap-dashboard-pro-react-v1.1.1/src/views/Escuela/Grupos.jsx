import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    FormControl,
    Table
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Select from "react-select";

import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-bootstrap-switch";

class RegularForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciclos: [{ label: "2015/2016" }, { label: "2016/2017" }, { label: "2017/2018" }, { label: "2018/2019" }],
            niveles: [{ label: "Maternal" }, { label: "Kinder" }, { label: "Primaria" }, { label: "Secundaria" }],
            grados: [{ label: "1ero" }, { label: "2d0" }, { label: "3ero" }, { label: "4to" }],
            campus: [{ label: "Main Campus" }],
            aulas: [{ label: "A-101" }, { label: "A-102" }, { label: "A-103" }, { label: "A-104" }],
            profesores: [{ id: 1, label: "Juan", value: "Juan" }, { id: 2, label: "Pedro", value: "Pedro" }, { id: 3, label: "Edgar", value: "Edgar" }, { id: 4, label: "Jaime", value: "Jaime" }],
            grupos: [],
            grupo: {
                ciclosOpt: "",
                nivelesOpt: "",
                gradosOpt: "",
                campusOpt: "",
                aulasOpt: "",
                profesoresOpt: null,
                grupoVal: "",
                conceptos: null
            },
            conceptos: [
                { nombre: "Inscripción", periodicidad: false, monto: null, seleccionar: true },
                { nombre: "Colegiatura", periodicidad: true, monto: null, seleccionar: true },
                { nombre: "Cuota Anual", periodicidad: false, monto: null, seleccionar: true },
                { nombre: "Cuota Padres", periodicidad: false, monto: null, seleccionar: true }
            ]
        };
    }

    componentDidUpdate(prevProps, prevState) {
       if(this.state.grupo.conceptos !== prevState.grupo.conceptos){
            const newGrupos = [...this.state.grupos, this.state.grupo];
            this.setState({ grupos: newGrupos });
       }
       if(this.state.grupos !== prevState.grupos){
           console.log(this.state.grupos);
       }
    };

    handleOnChange = (e) => {
        if (e.target.name === "grupos") {
            var newObj = {...this.state.grupo};
            newObj.grupoVal = e.target.value;
            this.setState({grupo: newObj});
        } else {
            const i = e.target.id;
            const ar = [...this.state.conceptos];
            ar[i].monto = parseFloat(e.target.value);
            this.setState({ conceptos: ar });
        }
    };

    handleEnter = (e) => {
        if (e.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSeleccionar = (e) => {
        const i = e.props.id.split("_")[1];
        const ar = [...this.state.conceptos];
        ar[i].seleccionar = !ar[i].seleccionar;
        this.setState({conceptos: ar});
    }

    handleSubmit = (e) => {
        const conceptos = this.state.conceptos.filter(concepto => concepto.seleccionar);
        const newObj = {...this.state.grupo};
        newObj.conceptos = conceptos;
        this.setState({grupo: newObj});   
        //componentDidUpdate se encargar de agregar el nuevo grupo;
    };


    render() {
        const agregaGrupo = (
            <Row>
                <Row>
                    <Col md={12}>
                        <Col md={2}>
                            <legend>Ciclo</legend>
                            <Select
                                placeholder="Ciclo Escolar"
                                name="ciclos"
                                value={this.state.grupo.ciclosOpt}
                                options={this.state.ciclos}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.ciclosOpt = value;
                                    this.setState({ grupo: newObj });
                                }
                                }
                            />
                        </Col>
                        <Col md={2}>
                            <legend>Nivel</legend>
                            <Select
                                placeholder="Nivel Académico"
                                name="niveles"
                                value={this.state.grupo.nivelesOpt}
                                options={this.state.niveles}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.nivelesOpt = value;
                                    this.setState({ grupo: newObj });

                                }
                                }
                            />
                        </Col>
                        <Col md={2}>
                            <legend>Grado</legend>
                            <Select
                                placeholder="Grado"
                                name="grados"
                                value={this.state.grupo.gradosOpt}
                                options={this.state.grados}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.gradosOpt = value;
                                    this.setState({ grupo: newObj });

                                }
                                }
                            />
                        </Col>
                        <Col md={2}>
                            <legend>Campus</legend>
                            <Select
                                placeholder="Campus"
                                name="campus"
                                value={this.state.grupo.campusOpt}
                                options={this.state.campus}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.campusOpt = value;
                                    this.setState({ grupo: newObj });

                                }
                                }
                            />
                        </Col>
                        <Col md={2}>
                            <legend>Aula</legend>
                            <Select
                                placeholder="Aula"
                                name="aulas"
                                value={this.state.grupo.aulasOpt}
                                options={this.state.aulas}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.aulasOpt = value;
                                    this.setState({ grupo: newObj });

                                }
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
                                value={this.state.grupo.profesoresOpt}
                                options={this.state.profesores}
                                onChange={value => {
                                    const newObj = { ...this.state.grupo }
                                    newObj.profesoresOpt = value;
                                    this.setState({ grupo: newObj });
                                }}
                            />
                        </Col>
                        <Col md={4}>
                            <legend>Grupo</legend>
                            <FormControl
                                name="grupos"
                                onChange={this.handleOnChange}
                                value={this.state.grupo.grupoVal}
                                onKeyUp={this.handleEnter}
                                placeholder="A"
                                type="Text"
                            />
                        </Col>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th> #</th>
                                <th>Agregar</th>
                                <th> Concepto </th>
                                <th></th>
                                <th> Monto </th>
                                <th> Periodicidad </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.conceptos.map((prop, key) => {
                                var type = "";
                                key % 2 === 0 ? type = "" : type = "info"
                                return (
                                    <tr key={key} className={type}>
                                        <td>{key + 1}</td>
                                        <td>
                                            <Switch
                                                onText="✔"
                                                offText="✘"
                                                id={"sel_" + key}
                                                value={prop.seleccionar}
                                                onChange={this.handleSeleccionar}
                                            />
                                        </td>
                                        <td>{prop.nombre}</td>
                                        <td>$</td>
                                        <td>
                                            <FormControl
                                                name={prop.nombre}
                                                id={key}
                                                onChange={this.handleOnChange}
                                                value={prop.value}
                                                placeholder="2000.00"
                                                type="Text"
                                            />
                                        </td>
                                        <td>
                                            <Switch
                                                onText="✔"
                                                offText="✘"
                                                id={key}
                                                readonly={true}
                                                value={prop.periodicidad}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
                <Row>
                    <Col md={12}>
                        <Col md={12}>
                            <Button onClick={this.handleSubmit} pullRight bsStyle="info" fill>
                                Agregar
                            </Button>
                        </Col>
                    </Col>
                </Row>
            </Row>
        )

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Card
                            title="Agregar Grupos"
                            content={agregaGrupo}
                        />
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RegularForms;
