import React, { Component } from "react";
import { Grid, Row, Col, Media, FormControl, FormGroup } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

import Button from "components/CustomButton/CustomButton.jsx";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: ""
    };
}
handleSubmit = (e) => {
  console.log(e.target);
}
handleChange = (e,info) => {
    
  this.setState({[info]: e.target.value});
}

  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} mdOffset={2}>
            <div className="header-text">
              <h2>Bienvenido a EscuelApp</h2>
              <h4>Registrate</h4>
              <hr />
            </div>
          </Col>
          <Col md={4} mdOffset={2}>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-user" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Tu Cuenta Gratis</Media.Heading>
                Administrar tu escuela será algo sencillo.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-graph1" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Excelente Diseño</Media.Heading>
                Diseño y sencillez para tener a tu disposición la informacion que requieres.
              </Media.Body>
            </Media>
            <Media>
              <Media.Left>
                <div className="icon">
                  <i className="pe-7s-headphones" />
                </div>
              </Media.Left>
              <Media.Body>
                <Media.Heading>Continuo Desarrollo</Media.Heading>
                EscuelApp esta constantemente mejorando para ti.
              </Media.Body>
            </Media>
          </Col>
          <Col md={4}>
            <form >
              <Card
                plain
                content={
                  <div>
                    <FormGroup>
                      <FormControl
                       value={this.state.name}
                       onChange= {(e)=>this.handleChange(e, "name")}
                       type="text" 
                       name="name"
                       placeholder="nombre" 
                       
                       />
                    </FormGroup>
                    <FormGroup>
                      <FormControl 
                      value={this.state.lastname}
                      onChange= {(e)=>this.handleChange(e,"lastname")}
                      type="text" 
                      name="lastname"
                      placeholder="apellido" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl 
                      value={this.state.lastname}
                      onChange= {(e)=>this.handleChange(e,"email")}
                      type="email" 
                      name="email"
                      placeholder="Ingresa Correo Electronico" />
                    </FormGroup>
                    <FormGroup>
                      <FormControl 
                      value={this.state.lastname}
                      onChange= {(e)=>this.handleChange(e,"password")}
                      type="password" 
                      name ="password"
                      placeholder="Contraseña" />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button onClick= {(e) => this.handleSubmit(e)} wd fill neutral>
                    Registrarse
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default RegisterPage;
