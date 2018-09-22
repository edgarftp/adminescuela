import React, { Component } from "react";
import {
    Grid,
    Row,
    Col,
    Table,
    FormGroup,
    ControlLabel,
    FormControl,
    Form
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

import PersonalAPI from "../../api/personal";

class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profesorVal: "",
            profesores: []
        };
    }

    componentDidMount() {
        this.loadProfesores();
    }

    loadProfesores = () => {
        PersonalAPI.getAllProfesores()
            .then(profesores => {
                this.setState({ profesores: profesores.data });
            })
            .catch (err => console.log(err));
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
            case "profesor":
                PersonalAPI.addProfesor({
                    nombre: this.state.profesorVal
                })
                    .then(profesor => {
                        console.log(profesor);
                        this.loadProfesores();
                    })
                    .catch(err => console.log(err));
                this.setState({ profesorVal: "" });
                break;

            default:
                break;
        }
    };

    preventDefault = (e) => {
        e.preventDefault();
    }




    render() {
        const agregarProfesor = (
            <Card
                title="Añadir Profesor"
                content={
                    <Form onSubmit={this.preventDefault}>
                        <FormGroup>
                            <ControlLabel>Añadir</ControlLabel>
                            <FormControl
                                name="profesor"
                                onChange={this.handleOnChange}
                                value={this.state.profesorVal}
                                onKeyUp={this.handleEnter}
                                placeholder="Juan Perez"
                                type="Text"
                            />
                        </FormGroup>
                        <Button onClick={() => this.handleSubmit("profesor")} bsStyle="info" fill>
                            Submit
                        </Button>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th> Nombre </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.profesores.map((prop, key) => {
                                    var type = "";
                                    key % 2 === 0 ? type = "" : type = "info"
                                    return (
                                        <tr key={key} className={type}>
                                            <td>{key + 1}</td>
                                            <td>{prop.nombre}</td>
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
                            <Card
                                title="Conceptos de Pago"
                                content={agregarProfesor}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Config;
