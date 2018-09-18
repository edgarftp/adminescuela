import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    Table,
    FormGroup,
    PanelGroup,
    Panel,
    ControlLabel,
    FormControl,
    Form
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Switch from "react-bootstrap-switch";
import Button from "components/CustomButton/CustomButton.jsx";

import { opciones } from "variables/Variables.jsx";

import EscuelaAPI from "../../api/escuela";

class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ciclosVal: "",
            nivelesVal: "",
            gradodsVal: "",
            aulasVal: "",
            campusVal: "",
            conceptosVal: "",
            periodicidad: false,
            singleSelect: opciones[0],
            ciclos: [],
            niveles: ["Maternal", "Kinder", "Primaria", "Secundaria", "Preparatoria"],
            grados: ["1ero", "2do", "3ero", "4to", "5to", "6to", "1 Sem", "2 Sem", "3 Sem", "4 Sem", "5 Sem", "6 Sem"],
            aulas: ["A-101"],
            campus: ["Main Campus"],
            conceptos: [
                { nombre: "Inscripción", periodicidad: false, monto: null },
                { nombre: "Colegiatura", periodicidad: true, monto: null },
                { nombre: "Cuota Anual", periodicidad: false, monto: null },
                { nombre: "Cuota Padres", periodicidad: false, monto: null }
            ]
        };
    }

    componentDidMount() {
        this.loadCiclos();
    }

    loadCiclos = () => {
        EscuelaAPI.getAllCiclos()
            .then((ciclos) => {
                //const arr = ciclos.sort((a, b) => parseFloat(a.ciclo.split("/")[0]) - parseFloat(b.ciclo.split("/")[0]));
                this.setState({ ciclos: ciclos.data });
            })
            .catch(err => {
                console.log("Error al cargar ciclos")
            })
    }

    handleToggle = () => {
        this.setState({ periodicidad: !this.state.periodicidad });
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

    handleSubmit = (loc) => {
        switch (loc) {
            case "ciclos":
                EscuelaAPI.addCiclo({
                    ciclo: this.state.ciclosVal
                })
                    .then(ciclos => {
                        console.log(ciclos);
                        this.loadCiclos();
                    })
                    .catch(err => console.log(err));
                this.setState({ ciclosVal: "" });
                break;

            case "niveles":
                this.setState({ niveles: [...this.state.niveles, this.state.nivelesVal] });
                this.setState({ nivelesVal: "" });
                break;
            case "grados":
                this.setState({ grados: [...this.state.grados, this.state.gradosVal] });
                this.setState({ gradosVal: "" });
                break;
            case "campus":
                this.setState({ campus: [...this.state.campus, this.state.campusVal] });
                this.setState({ campusVal: "" });
                break;
            case "aulas":
                this.setState({ aulas: [...this.state.aulas, this.state.aulasVal] });
                this.setState({ aulasVal: "" });
                break;
            case "conceptos":
                const nuevoConcepto = {
                    nombre: this.state.conceptosVal,
                    periodicidad: this.state.periodicidad
                }
                this.setState({ conceptos: [...this.state.conceptos, nuevoConcepto] });
                this.setState({ conceptosVal: "" });
                this.setState({ periodicidad: false });
                break;
        }
    };

    preventDefault = (e) => {
        e.preventDefault();
    }




    render() {
        const defaultPanel = (
            <PanelGroup accordion id="panels" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel eventKey="1">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Ciclos Escolares<b className="caret" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <Card
                            title="Añadir Ciclo escolar"
                            content={
                                <Form onSubmit={this.preventDefault}>
                                    <FormGroup>
                                        <ControlLabel>Nuevo Ciclo Escolar</ControlLabel>
                                        <FormControl
                                            name="ciclos"
                                            onChange={this.handleOnChange}
                                            value={this.state.ciclosVal}
                                            onKeyUp={this.handleEnter}
                                            placeholder="2018/2019"
                                            type="Text"
                                        />
                                    </FormGroup>
                                    <Button onClick={() => this.handleSubmit("ciclos")} bsStyle="info" fill>
                                        Submit
                                    </Button>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> #</th>
                                                <th> Ciclo </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                 this.state.ciclos.map((prop, key) => {
                                                    console.log("prop " + prop);
                                                    var type = "";
                                                    key % 2 === 0 ? type = "" : type = "info"
                                                    return (
                                                        <tr key={key} className={type}>
                                                            <td>{key + 1}</td>
                                                            <td key={key}>{prop.ciclo}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </Table>
                                </Form>
                            }
                        />
                    </Panel.Body>
                </Panel>
                <Panel eventKey="2">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Niveles Académico<b className="caret" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <Card
                            title="Añadir Niveles Académico"
                            content={
                                <form onSubmit={this.preventDefault}>
                                    <FormGroup>
                                        <ControlLabel>Nuevo Nivel Académico</ControlLabel>
                                        <FormControl
                                            name="niveles"
                                            onChange={this.handleOnChange}
                                            value={this.state.nivelesVal}
                                            onKeyUp={this.handleEnter}
                                            placeholder="Primaria"
                                            type="Text"
                                        />
                                    </FormGroup>
                                    <Button onClick={() => this.handleSubmit("niveles")} bsStyle="info" fill>
                                        Submit
                                    </Button>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> #</th>
                                                <th> Niveles </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.niveles.map((prop, key) => {
                                                var type = "";
                                                key % 2 === 0 ? type = "" : type = "info"
                                                return (
                                                    <tr key={key} className={type}>
                                                        <td>{key + 1}</td>
                                                        <td key={key}>{prop}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </form>
                            }
                        />
                    </Panel.Body>
                </Panel>
                <Panel eventKey="3">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Grados Académicos<b className="caret" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <Card
                            title="Añadir Grados Académicos"
                            content={
                                <form onSubmit={this.preventDefault}>
                                    <FormGroup>
                                        <ControlLabel>Nuevo Grado Académico</ControlLabel>
                                        <FormControl
                                            name="grados"
                                            onChange={this.handleOnChange}
                                            value={this.state.gradosVal}
                                            onKeyUp={this.handleEnter}
                                            placeholder="1ero"
                                            type="Text"
                                        />
                                    </FormGroup>
                                    <Button onClick={() => this.handleSubmit("grados")} bsStyle="info" fill>
                                        Submit
                                    </Button>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> #</th>
                                                <th> Grados </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.grados.map((prop, key) => {
                                                var type = "";
                                                key % 2 === 0 ? type = "" : type = "info"
                                                return (
                                                    <tr key={key} className={type}>
                                                        <td>{key + 1}</td>
                                                        <td key={key}>{prop}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </form>
                            }
                        />
                    </Panel.Body>
                </Panel>
                <Panel eventKey="4">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Campus<b className="caret" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <Card
                            title="Añadir Campus"
                            content={
                                <form onSubmit={this.preventDefault}>
                                    <FormGroup>
                                        <ControlLabel>Nuevo Campus</ControlLabel>
                                        <FormControl
                                            name="campus"
                                            onChange={this.handleOnChange}
                                            value={this.state.campusVal}
                                            onKeyUp={this.handleEnter}
                                            placeholder="Main Campus"
                                            type="Text"
                                        />
                                    </FormGroup>
                                    <Button onClick={() => this.handleSubmit("campus")} bsStyle="info" fill>
                                        Submit
                                    </Button>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> #</th>
                                                <th> Campus </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.campus.map((prop, key) => {
                                                var type = "";
                                                key % 2 === 0 ? type = "" : type = "info"
                                                return (
                                                    <tr key={key} className={type}>
                                                        <td>{key + 1}</td>
                                                        <td key={key}>{prop}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </form>
                            }
                        />
                    </Panel.Body>
                </Panel>
                <Panel eventKey="5">
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Aulas<b className="caret" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>
                        <Card
                            title="Añadir Aulas"
                            content={
                                <form onSubmit={this.preventDefault}>
                                    <FormGroup>
                                        <ControlLabel>Nueva Aula</ControlLabel>
                                        <FormControl
                                            name="aulas"
                                            onChange={this.handleOnChange}
                                            value={this.state.aulasVal}
                                            onKeyUp={this.handleEnter}
                                            placeholder="A-101"
                                            type="Text"
                                        />
                                    </FormGroup>
                                    <Button onClick={() => this.handleSubmit("aulas")} bsStyle="info" fill>
                                        Submit
                                    </Button>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> #</th>
                                                <th> Aula </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.aulas.map((prop, key) => {
                                                var type = "";
                                                key % 2 === 0 ? type = "" : type = "info"
                                                return (
                                                    <tr key={key} className={type}>
                                                        <td>{key + 1}</td>
                                                        <td key={key}>{prop}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </form>
                            }
                        />
                    </Panel.Body>
                </Panel>
            </PanelGroup>
        );

        const agregarConcepto = (
            <Card
                title="Añadir Conceptos de Pago"
                content={
                    <Form onSubmit={this.preventDefault}>
                        <FormGroup>
                            <ControlLabel>Nuevo Concepto de Pago</ControlLabel>
                            <FormControl
                                name="conceptos"
                                onChange={this.handleOnChange}
                                value={this.state.conceptosVal}
                                onKeyUp={this.handleEnter}
                                placeholder="Colegiatura"
                                type="Text"
                            />
                            <br />
                            <p>Periodicidad</p>
                            <Switch
                                onText="✔"
                                offText="✘"
                                value={this.state.periodicidad}
                                onChange={this.handleToggle}
                            />
                        </FormGroup>
                        <Button onClick={() => this.handleSubmit("conceptos")} bsStyle="info" fill>
                            Submit
                                                </Button>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th> Concepto </th>
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
                                            <td>{prop.nombre}</td>
                                            <td>{
                                                prop.periodicidad ? "Mensual" : "Un solo pago"
                                            }</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Form>
                }
            />
        )


        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card title="Configurar Escuela" content={defaultPanel} />
                        </Col>
                        <Col md={12}>
                            <Card
                                title="Conceptos de Pago"
                                content={agregarConcepto}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Config;
