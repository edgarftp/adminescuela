import React, { Component } from "react";
import axios from "axios";
import {
    Grid,
    Row,
    Col,
    FormControl,
    Table,
    Tooltip,
    OverlayTrigger,
    ControlLabel
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Select from "react-select";

import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-bootstrap-switch";

import EscuelaAPI from "../../api/escuela";
import PersonalAPI from "../../api/personal";

class RegularForms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciclos: [],
            niveles: [],
            grados: [],
            campus: [],
            aulas: [],
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
            conceptos: []
        };
    }

    componentDidMount() {
        this.loadInfo();
        this.loadGrupos();
        this.loadProfesores();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.grupo.conceptos !== prevState.grupo.conceptos) {
            const newGrupo = {
                grupo: this.state.grupo.grupoVal,
                ciclo: this.state.grupo.ciclosOpt._id,
                ciclo_name: this.state.grupo.ciclosOpt.ciclo,
                nivel: this.state.grupo.nivelesOpt._id,
                nivel_name: this.state.grupo.nivelesOpt.nivel,
                grado: this.state.grupo.gradosOpt._id,
                grado_name: this.state.grupo.gradosOpt.grado,
                campus: this.state.grupo.campusOpt._id,
                campus_name: this.state.grupo.campusOpt.campus,
                aula: this.state.grupo.aulasOpt._id,
                aula_name: this.state.grupo.aulasOpt.aula,
                profesores: this.state.grupo.profesoresOpt,
                conceptos: this.state.grupo.conceptos
            };

            EscuelaAPI.addGrupo({ grupo: newGrupo })
                .then(grupo => {
                    console.log(grupo);
                    this.loadGrupos();
                })
                .catch(err => console.log(err));
        }

        if (this.state.grupo.ciclosOpt !== prevState.grupo.ciclosOpt) {
        }
    };

    loadInfo = () => {
        EscuelaAPI.escuelaInfo()
            .then(axios.spread((ciclos, niveles, grados, campus, aulas, conceptos) => {
                const labeledCiclo = this.addLabel(ciclos.data, "ciclo");
                const labeledNivel = this.addLabel(niveles.data, "nivel");
                const labeledGrado = this.addLabel(grados.data, "grado");
                const labeledCampus = this.addLabel(campus.data, "campus");
                const labeledAula = this.addLabel(aulas.data, "aula");
                const labeledConceptos = this.addLabel(conceptos.data, "conceptos");

                this.setState({
                    ciclos: labeledCiclo,
                    niveles: labeledNivel,
                    grados: labeledGrado,
                    campus: labeledCampus,
                    aulas: labeledAula,
                    conceptos: labeledConceptos
                });

            }));
    }

    loadGrupos = () => {
        EscuelaAPI.getAllGrupos()
            .then(grupos => {
                console.log(grupos.data);
                this.setState({ grupos: grupos.data });
            })
            .catch(err => console.log(err));
    }

    loadProfesores = () => {
        PersonalAPI.getAllProfesores()
            .then(profesores => {
                const arr = profesores.data.map((profe, key) => {
                    const newObj = { ...profe, label: profe.nombre, value: key };
                    return newObj;
                })

                this.setState({ profesores: arr });
            })
            .catch(err => console.log(err));
    }

    addLabel = (arr, name) => {
        if (name !== "conceptos") {
            return arr.map(obj => {
                const newObj = { ...obj, label: obj[name] };
                return newObj
            })
        } else {
            return arr.map(obj => {
                const newObj = { ...obj, seleccionar: true };
                return newObj
            })
        }
    }

    handleOnChange = (e) => {
        if (e.target.name === "grupos") {
            var newObj = { ...this.state.grupo };
            newObj.grupoVal = e.target.value;
            this.setState({ grupo: newObj });
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
        this.setState({ conceptos: ar });
    }

    handleSubmit = (e) => {
        const conceptos = this.state.conceptos.filter(concepto => concepto.seleccionar);
        console.log(conceptos);
        const newObj = { ...this.state.grupo };
        newObj.conceptos = conceptos;
        console.log(newObj);
        this.setState({ grupo: newObj });
        //componentDidUpdate se encargar de agregar el nuevo grupo;
    };


    render() {
        const view = <Tooltip id="view">View Profile</Tooltip>;
        const edit = <Tooltip id="edit">Edit Profile</Tooltip>;
        const remove = <Tooltip id="remove">Remove</Tooltip>;

        const actions = (
            <td className="td-actions text-right">
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-user" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit}>
                    <Button simple bsStyle="success" bsSize="xs">
                        <i className="fa fa-edit" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={remove}>
                    <Button simple bsStyle="danger" bsSize="xs">
                        <i className="fa fa-times" />
                    </Button>
                </OverlayTrigger>
            </td>
        );


        const agregaGrupo = (
            <Row>
                <Row>
                    <Col md={12}>
                        <Col md={2}>
                        <ControlLabel>Ciclo Escolar</ControlLabel>
                            <Select
                                placeholder="Ciclo Escolar"
                                name="ciclos"
                                clearable={false}
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
                        <ControlLabel>Nivel</ControlLabel>
                            <Select
                                placeholder="Nivel Académico"
                                name="niveles"
                                clearable={false}
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
                        <ControlLabel>Grado</ControlLabel>
                            <Select
                                placeholder="Grado"
                                name="grados"
                                clearable={false}
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
                        <ControlLabel>Campus</ControlLabel>
                            <Select
                                placeholder="Campus"
                                name="campus"
                                clearable={false}
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
                        <ControlLabel>Aula</ControlLabel>
                            <Select
                                placeholder="Aula"
                                name="aulas"
                                clearable={false}
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
                        <ControlLabel>Profesores</ControlLabel>
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
                        <ControlLabel>Grupo</ControlLabel>
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
                                                id={key.toString()}
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
                <br />
                <Row>
                    <Card
                        title="Grupos"
                        tableFullWidth
                        content={
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th>Ciclo</th>
                                        <th>Nivel</th>
                                        <th>Grado</th>
                                        <th>Campus</th>
                                        <th>Aula</th>
                                        <th>Grupo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.grupos.map((prop, key) => {
                                        var type = "";
                                        key % 2 === 0 ? type = "" : type = "info"
                                        return (
                                            <tr key={key} className={type}>
                                                <td>{key + 1}</td>
                                                <td>{prop.ciclo_name}</td>
                                                <td>{prop.nivel_name}</td>
                                                <td>{prop.grado_name}</td>
                                                <td>{prop.campus_name}</td>
                                                <td>{prop.aula_name}</td>
                                                <td>{prop.grupo}</td>
                                                {actions}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        }
                    />
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
