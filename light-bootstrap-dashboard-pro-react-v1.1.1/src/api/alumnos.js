import axios from "axios";

export default {
    
    addAlumno: (alumno) => {
        return axios.post("http://localhost:3001/alumnos/add_alumno", alumno);
    },
    
    addFamilia: (familia) => {
        return axios.post("http://localhost:3001/alumnos/add_familia", familia);
    },

    addInscripcion: (insc) => {
        return axios.post("http://localhost:3001/alumnos/add_inscripcion", insc);
    },
    conceptosAlumno: (id) => {
        return axios.get("http://localhost:3001/alumnos/get_conceptosalumno/"+id);
    },
    addPagos: (pagos) => {
        return axios.post("http://localhost:3001/alumnos/add_pagos/",pagos);
    },

    alumnosInfo: () => {
        return axios.all([
            axios.get("http://localhost:3001/alumnos/get_alumnos"),
            axios.get("http://localhost:3001/alumnos/get_familias")
        ])
    }
}