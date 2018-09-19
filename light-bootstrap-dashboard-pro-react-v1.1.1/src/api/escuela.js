import axios from "axios";

export default {
    
    addCiclo: (ciclo) => {
        return axios.post("http://localhost:3001/escuela/add_ciclo", ciclo);
    },

    addNivel: (nivel) => {
        return axios.post("http://localhost:3001/escuela/add_nivel", nivel);
    },

    addGrado: (grado) => {
        return axios.post("http://localhost:3001/escuela/add_grado", grado);
    },

    addCampus: (campus) => {
        return axios.post("http://localhost:3001/escuela/add_campus", campus);
    },

    addAula: (aula) => {
        return axios.post("http://localhost:3001/escuela/add_aula", aula);
    }, 

    addConcepto: (concepto) => {
        return axios.post("http://localhost:3001/escuela/add_concepto", concepto);
    }, 

    addGrupo: (grupo) => {
        return axios.post("http://localhost:3001/escuela/add_grupo", grupo);
    }, 

    getAllGrupos: () => {
        return axios.get("http://localhost:3001/escuela/get_grupos");
    },
    
    escuelaInfo: () => {
        return axios.all([
            axios.get("http://localhost:3001/escuela/get_ciclos"),
            axios.get("http://localhost:3001/escuela/get_niveles"),
            axios.get("http://localhost:3001/escuela/get_grados"),
            axios.get("http://localhost:3001/escuela/get_campus"),
            axios.get("http://localhost:3001/escuela/get_aulas"),
            axios.get("http://localhost:3001/escuela/get_conceptos")
        ])
    }
}