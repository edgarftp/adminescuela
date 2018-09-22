import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {OverlayTrigger, Tooltip} from "react-bootstrap";


import Button from "components/CustomButton/CustomButton.jsx";

export class TablaInscripcion extends Component {
    render() {
        const view = <Tooltip id="view">Inscribir</Tooltip>;
        const actions = (
                <OverlayTrigger placement="top" overlay={view}>
                    <Button simple bsStyle="info" bsSize="xs">
                        <i className="fa fa-user" />
                    </Button>
                </OverlayTrigger>
        );
        const inscData = this.props.grupos.map(grupo => {
            const newObj = { ...grupo, actions: actions };
            return newObj
        })
        const { SearchBar } = Search;

        const columns = [{
            dataField: '_id',
            text: 'Id',
            hidden: true
        }, {
            dataField: 'ciclo_name',
            text: 'Ciclo Escolar',
            sort: true
        }, {
            dataField: 'nivel_name',
            text: 'Nivel',
            sort: true
        }, {
            dataField: 'grado_name',
            text: 'Grado',
            sort: true
        }, {
            dataField: 'grupo',
            text: 'Grupo',
            sort: true
        }, {
            dataField: 'campus_name',
            text: 'Campus',
            sort: true
        }, {
            dataField: 'aula_name',
            text: 'Aula'
        }]

        const rowEvents = {
            onClick: (e,row) => this.props.confirmarInsc(e, row)
        }
        return (
            <ToolkitProvider
                keyField="_id"
                data={inscData}
                columns={columns}
                search={{ searchFormatted: true }}

            >
                {
                    props => (
                        <div>
                            <h3>Selecciona grupo a Inscribir:</h3>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                hover
                                condensed
                                rowEvents = {this.props.switch? rowEvents: null}

                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        );
    }
}

export default TablaInscripcion;
