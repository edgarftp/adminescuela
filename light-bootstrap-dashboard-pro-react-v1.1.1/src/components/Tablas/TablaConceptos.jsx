import React, { Component } from "react";
import axios from "axios";
import {
    Row,
    Col,
    FormControl,
    Table
} from "react-bootstrap";



import Button from "components/CustomButton/CustomButton.jsx";
import Switch from "react-bootstrap-switch";




export class TablaConceptos extends Component {
    render() {
        console.log(this.props.conceptos);
        const newArr = [...this.props.conceptos];
        const labeling = newArr.map(concepto => {
            if (concepto.periodicidad) {
                const newObj = { ...concepto };
                newObj.periodicidad = "Mensual"
                return newObj;
            } else {
                const newObj = { ...concepto };
                newObj.periodicidad = "Una sola Vez"
                return newObj;
            }
        });

        return (
            <Row>
                <Col md={12}>
                    <Row>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th> #</th>
                                    <th> Concepto </th>
                                    <th></th>
                                    <th> Monto </th>
                                    <th> Periodicidad </th>
                                </tr>
                            </thead>
                            <tbody>
                                {newArr.map((prop, key) => {
                                    var type = "";
                                    key % 2 === 0 ? type = "" : type = "info"
                                    return (
                                        <tr key={prop._id} className={type}>
                                            <td>{key + 1}</td>
                                            <td>{prop.concepto}</td>
                                            <td>$</td>
                                            <td>
                                                <FormControl
                                                    name={prop.concepto}
                                                    id={key.toString()}
                                                    onChange={this.props.change}
                                                    value={prop.monto}
                                                    type="Text"
                                                />
                                            </td>
                                            <td> {prop.periodicidad}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Row>
                    <br />
                    <Row>
                        <Col md={12}>
                            <Col md={12}>
                                <Button
                                    onClick={this.props.submit}
                                    pullRight bsStyle="info" fill>
                                    Agregar
                        </Button>
                            </Col>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default TablaConceptos;
