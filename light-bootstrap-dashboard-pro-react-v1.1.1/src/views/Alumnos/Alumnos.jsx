import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    Nav,
    NavItem,
    Tab,
    Tooltip,
    OverlayTrigger,
    ControlLabel
} from "react-bootstrap";
import axios from 'axios';

import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from "react-select";
import TablaInscripciones from "../../components/Tablas/TablaInscripcion.jsx"
import TablaAlumnos from "../../components/Tablas/TablaAlumnos.jsx"
import TablaConceptos from "../../components/Tablas/TablaConceptos.jsx"
import FormaAltaAlumno from "../../components/Formas/FormaAltaAlumno";
import FormaAltaFamilia from "../../components/Formas/FormaAltaFamilia";
import LecturaAlumno from "../../components/Formas/LecturaAlumno";
import ConfirmarInsc from "../../components/Modales/ConfirmarInsc";

import EscuelaAPI from "../../api/escuela";
import AlumnosAPI from "../../api/alumnos";

import "moment/locale/es";



class Alumnos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            show: false,
            sendAlumnos: false,
            checkFamilia: false,
            activeTab: "alumnos",
            grupos: [],
            alumnos: [],
            nuevoAlumno: {
                matricula: "",
                nombre: "",
                apellidoP: "",
                apellidoM: "",
                sexo: null,
                fechaDeNacimiento: null,
                curp: "",
                escuelaDeP: "",
                ciudadDeP: "Reynosa",
                familia: ""
            },
            allFamilias: [],
            familia: {
                nombrePadre: "",
                celPadre: "",
                oficinaPadre: "",
                trabajoPadre: "",
                emailPadre: "",
                nombreMadre: "",
                celMadre: "",
                oficinaMadre: "",
                trabajoMadre: "",
                emailMadre: "",
                calle: "",
                numero: "",
                apartamento: "",
                colonia: "",
                telCasa: ""
            },
            alumnoInscribir: {},
            selectedAlumno: {},
            switchInsc: false,
            selectedGrupo: {}
        };
    }

    componentDidMount() {
        this.loadGrupos();
        this.loadInfo();


    }
    componentDidUpdate(e) {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this._reactInternalInstance._currentElement._owner._instance._reactInternalInstance._currentElement._owner._instance.componentDidUpdate(
                e
            );
        }
        console.log(this.state.conceptos);
    }
    isMac() {
        let bool = false;
        if (
            navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
            navigator.platform.toUpperCase().indexOf("IPAD") >= 0
        ) {
            bool = true;
        }
        return bool;
    }
    ///////////////////////////////////////////////
    //                SWEET ALert                //
    ///////////////////////////////////////////////
    handleConfirmarInsc = (e, row) => {
        this.setState({
            alert: (
                <SweetAlert
                    info
                    style={{ display: "block", marginTop: "-200px", marginLeft: "-200px" }}
                    onConfirm={() => this.addInsc()}
                    onCancel={() => this.hideAlert(0)}
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Inscribir"
                    cancelBtnText="Cancelar"
                    showCancel
                >
                    <ConfirmarInsc alumno={this.state.selectedAlumno} grupo={row} />
                </SweetAlert>
            ),
            selectedGrupo: row
        });
    }

    hideAlert = (bool) => {
        this.setState({
            alert: null,
            selectedGrupo: {}
        });
        if(bool){
            this.handleSwitchTab("alumnos");
        }
    }
    ///////////////////////////////////////////////
    //             end SWEETALERT                //
    ///////////////////////////////////////////////
    ///////////////////////////////////////////////
    //                API CALLS                  //
    ///////////////////////////////////////////////
    loadGrupos = () => {
        EscuelaAPI.getAllGrupos()
            .then(grupos => {
                this.setState({ grupos: grupos.data });
            })
            .catch(err => console.log(err));
    }
    loadInfo = () => {
        AlumnosAPI.alumnosInfo()
            .then(axios.spread((alumnos, familias) => {
                const fam = familias.data.map(familia => {
                    const newObj = { ...familia, label: familia.mama.nombre + " / " + familia.papa.nombre };
                    return newObj;
                })
                this.setState({
                    alumnos: alumnos.data,
                    allFamilias: fam
                });
            }));
    }

    loadConceptos = (insc) => {
        console.log(insc);
        AlumnosAPI.conceptosAlumno(insc)
            .then(conceptos => {
                console.log(conceptos);
                this.setState({ conceptos: conceptos.data});
            })
            .catch(err => console.log(err));
    }

    addPagos = (pagos) => {
        AlumnosAPI.addPagos(pagos)
            .then((pagos) => {
                console.log(pagos);
            })
            .catch(err => console.log(err));
    }

    addInsc = () => {
        const newObj = {
            alumno: this.state.selectedAlumno._id,
            grupo: this.state.selectedGrupo._id
        }
        AlumnosAPI.addInscripcion({ insc: newObj })
            .then(inscripcion => {
               this.setState({
                    alert: (
                        <SweetAlert
                            success
                            style={{ display: "block", marginTop: "-200px", marginLeft: "-200px" }}
                            onConfirm={() => this.hideAlert(1)}
                            onCancel={() => this.hideAlert(1)}
                            confirmBtnBsStyle="info"
                        >
                            <div>
                                <p>{
                                    this.state.selectedAlumno.nombre + " " +
                                    this.state.selectedAlumno.apellidoP + " " +
                                    this.state.selectedAlumno.apellidoM
                                }</p>
                                <p>Ha sido Inscrito</p>
                            </div>
                        </SweetAlert>
                    ),
                });
                setTimeout(()=>this.hideAlert(1), 1300);
                
            })
            .catch(err => console.log(err));
    }

    addAlumnoFamilia = () => {
        const fam = { ...this.state.familia };
        const familia = {
            papa: {
                nombre: fam.nombrePadre,
                telCelular: fam.celPadre,
                telOficina: fam.oficinaPadre,
                trabajo: fam.trabajoPadre,
                email: fam.emailPadre
            },
            mama: {
                nombre: fam.nombreMadre,
                telCelular: fam.celMadre,
                telOficina: fam.oficinaMadre,
                trabajo: fam.trabajoMadre,
                email: fam.emailMadre
            },
            direccion: {
                calle: fam.calle,
                numero: fam.numero,
                apartamento: fam.apartamento,
                colonia: fam.colonia
            },
            telCasa: fam.telCasa
        }
        AlumnosAPI.addFamilia({ familia: familia })
            .then(familia => {
                const alu = { ...this.state.nuevoAlumno };
                const dob = new Date(alu.fechaDeNacimiento.split("/").reverse().join(","));
                const alumno = {
                    matricula: alu.matricula,
                    nombre: alu.nombre,
                    apellidoP: alu.apellidoP,
                    apellidoM: alu.apellidoM,
                    sexo: alu.sexo,
                    fechaNacimiento: dob,
                    curp: alu.curp,
                    procedencia: {
                        escuela: alu.escuelaDeP,
                        ciudad: alu.ciudadDeP
                    },
                    familia: familia.data._id
                }

                return AlumnosAPI.addAlumno({ alumno: alumno })
            })
            .then(alumno => {
                this.setState({ selectedAlumno: alumno.data });
                this.handleSwitchTab("insc");
                this.handleResetAlumno();
            })
            .catch(err => console.log(err));
    }

    addAlumno = () => {
        const alu = { ...this.state.nuevoAlumno };
        const dob = new Date(alu.fechaDeNacimiento.split("/").reverse().join(","));
        const alumno = {
            matricula: alu.matricula,
            nombre: alu.nombre,
            apellidoP: alu.apellidoP,
            apellidoM: alu.apellidoM,
            sexo: alu.sexo,
            fechaNacimiento: dob,
            curp: alu.curp,
            procedencia: {
                escuela: alu.escuelaDeP,
                ciudad: alu.ciudadDeP
            },
            familia: alu.familia
        }

        AlumnosAPI.addAlumno({ alumno: alumno })
            .then(alumno => {
                this.setState({ selectedAlumno: alumno.data });
                this.handleSwitchTab("insc");
                this.handleResetAlumno();
            })
            .catch(err => console.log(err));
    }
    /////////////////////////////////////////////
    //               ENDS API CALLS            //
    /////////////////////////////////////////////


    handleResetAlumno = () => {
        this.setState({
            nuevoAlumno: {
                matricula: "",
                nombre: "",
                apellidoP: "",
                apellidoM: "",
                sexo: null,
                fechaDeNacimiento: null,
                curp: "",
                escuelaDeP: "",
                ciudadDeP: "Reynosa",
                familia: ""
            }
        })
    }
    handleSwitchTab = (tab) => {

        if (tab === "insc") {
            this.setState({ activeTab: "inscripcion", switchInsc: true });
        } else if(tab==="pagos"){
            //
        }else {
            this.setState({ activeTab: tab });
        }
    }

    handleChange = e => {
        const newObj = { ...this.state.nuevoAlumno };
        newObj[e.target.name] = e.target.value;
        this.setState({ nuevoAlumno: newObj });
    }
    handleChangeFamilia = e => {
        const newObj = { ...this.state.familia };
        newObj[e.target.name] = e.target.value;
        this.setState({ familia: newObj });
    }

    handleCheckChange = () => {
        const newObj = { ...this.state.nuevoAlumno };
        newObj.familia = "";
        this.setState({
            checkFamilia: !this.state.checkFamilia,
            nuevoAlumno: newObj
        });
    }

    handleDOB = (e) => {
        const newObj = { ...this.state.nuevoAlumno };
        newObj.fechaDeNacimiento = e._d;
        this.setState({ nuevoAlumno: newObj });
    }
    handleSexo = (e) => {
        const newObj = { ...this.state.nuevoAlumno };
        newObj.sexo = e.value;
        this.setState({ nuevoAlumno: newObj });
    }
    handleSelected = (e, row) => {
        console.log(row);
        this.setState({ selectedAlumno: row });
    }

   

    render() {

        const bg = { backgroundColor: 'white' };
        const view = <Tooltip id="view">Inscribir</Tooltip>;
        const edit = <Tooltip id="edit">Registrar Pago</Tooltip>;


        const buscaFamilia = (
            <Row>
                <Col md={12}>
                    <Col md={6}>
                        <ControlLabel>Familia</ControlLabel>
                        <Select
                            name="familia"
                            value={this.state.nuevoAlumno.familia}
                            options={this.state.allFamilias}
                            onChange={value => {
                                const newObj = { ...this.state.nuevoAlumno }
                                newObj.familia = value;
                                this.setState({ nuevoAlumno: newObj });
                            }}
                        />
                    </Col>
                </Col>
            </Row>
        )

        const actions = (
            <div>
                <OverlayTrigger placement="top" overlay={view}>
                    <Button onClick={() => this.handleSwitchTab("insc")} simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-folder-open" />
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={edit}>
                    <Button simple bsStyle="success" bsSize="xs">
                        <i className="fa fa-usd" />
                    </Button>
                </OverlayTrigger>
            </div>
        );

        const tabsIcons = (
            <Tab.Container style={bg} id="tabs-with-dropdown" onSelect={this.handleSwitchTab} activeKey={this.state.activeTab}>
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="alumnos">
                                <i className="fa fa-user" /> Alumnos
                            </NavItem>
                            <NavItem eventKey="agregar">
                                <i className="fa fa-plus-circle" /> Agregar
                            </NavItem>
                            <NavItem eventKey="inscripcion">
                                <i className="fa fa-folder-open" /> Inscripción
                            </NavItem>
                            <NavItem eventKey="pagos">
                                <i className="fa fa-usd" /> Pagos
                            </NavItem>

                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="alumnos">
                                <Row>
                                    <Col md={12}>
                                        <TablaAlumnos
                                            actions={actions}
                                            alumnos={this.state.alumnos}
                                            handleSelected={this.handleSelected}
                                        />
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="agregar">
                                <Row>
                                    <FormaAltaAlumno
                                        alumno={this.state.nuevoAlumno}
                                        handleChange={this.handleChange}
                                        checkChange={this.handleCheckChange}
                                        handleSexo={this.handleSexo}
                                        handleDOB={this.handleDOB}
                                    />
                                    <Row>
                                        <Col md={12}>
                                            {this.state.checkFamilia ? buscaFamilia : null}
                                            <br />
                                            <FormaAltaFamilia
                                                familia={this.state.familia}
                                                checkFamilia={this.state.checkFamilia}
                                                handleChangeFamilia={this.handleChangeFamilia}
                                            />
                                            <br />

                                            <Col md={12}>
                                                <Button
                                                    onClick={this.state.checkFamilia ? this.addAlumno : this.addAlumnoFamilia}
                                                    pullRight bsStyle="info" fill>
                                                    Agregar
                                                </Button>
                                            </Col>

                                        </Col>
                                    </Row>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="inscripcion">
                                <Row>
                                    <LecturaAlumno
                                        alumno={this.state.selectedAlumno}
                                        cambiarAlumno={this.handleSwitchTab}
                                    />
                                </Row>
                                <br />
                                  <TablaInscripciones
                                        grupos={this.state.grupos}
                                        confirmarInsc={this.handleConfirmarInsc}
                                        switch={this.state.switchInsc}
                                    />
                                {this.state.alert}
                            </Tab.Pane>
                            <Tab.Pane eventKey="pagos">
                                Explore a wide Houses Inc., a group of architects and interior
                                designers based in Chicago and operating for clients worldwide.
                                We’ve been designing stunningly beautiful houses and making
                                clients happy for years.
                            </Tab.Pane>
                            <Tab.Pane eventKey="conceptos">
                                Explore a wide Houses Inc., a group of architects and interior
                                designers based in Chicago and operating for clients worldwide.
                                We’ve been designing stunningly beautiful houses and making
                                clients happy for years.
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container >
        );

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            {tabsIcons}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Alumnos;
