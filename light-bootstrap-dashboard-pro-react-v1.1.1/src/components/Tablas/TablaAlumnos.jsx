import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';



export class TablaAlumnos extends Component {
    render() {
            const inscData = this.props.alumnos.map(alu => {
                const newObj = { ...alu, actions: this.props.actions };
                return newObj
            });
        const { SearchBar } = Search;

        const columns = [{
            dataField: '_id',
            text: 'Id',
            hidden: true
        },{
            dataField: 'matricula',
            text: 'Matricula',
            sort: true
        }, {
            dataField: 'nombre',
            text: 'Nombre',
            sort: true
        }, {
            dataField: 'apellidoP',
            text: 'Apellido P.',
            sort: true
        }, {
            dataField: 'apellidoM',
            text: 'Apellido M.',
            sort: true
        }, {
            dataField: 'actions',
            text: "acciones"
        }]
        const rowEvents = {
            onClick: (e,row)=> this.props.handleSelected(e,row)
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
                            <h3>Buscar Alumno:</h3>
                            <SearchBar {...props.searchProps} />
                            <hr />
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                hover
                                condensed
                                rowEvents = {rowEvents}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        );
    }
}

export default TablaAlumnos;
