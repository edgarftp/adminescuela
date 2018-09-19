import React, { Component } from "react";
import axios from "axios";
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

import EscuelaAPI from "../../api/escuela";

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

    componentDidMount(){
        this.loadInfo();
        this.loadGrupos();
    }

    componentDidUpdate(prevProps, prevState) {
       if(this.state.grupo.conceptos !== prevState.grupo.conceptos){
           console.log(this.state.grupo.conceptos);
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
                conceptos: this.state.grupo.conceptos
            };

            console.log(newGrupo);
            EscuelaAPI.addGrupo({grupo: newGrupo})
            .then(grupo => {
                console.log(grupo);
                this.loadGrupo();
            })
            .catch(err => console.log(err));
       }

       if(this.state.grupo.ciclosOpt !== prevState.grupo.ciclosOpt){
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
        .then(grupos =>  {
            console.log(grupos.data);
            this.setState({grupos: grupos.data});
        })
        .catch (err => console.log(err));
    }

    addLabel = (arr, name) => {
        if(name !== "conceptos"){
            return arr.map(obj => {
                const newObj = {...obj, label: obj[name]};
                return newObj
            })
        } else {
            return arr.map(obj => {
                const newObj = {...obj, seleccionar: true};
                return newObj
            })
        }
    }

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
        console.log(conceptos);
        const newObj = {...this.state.grupo};
        newObj.conceptos = conceptos;
        console.log(newObj);
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
