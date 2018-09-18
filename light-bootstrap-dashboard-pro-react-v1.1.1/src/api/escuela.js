import axios from "axios";

export default {
    getAllCiclos: () => {
        return axios.get("http://localhost:3001/escuela/get_ciclos");
    },
    addCiclo: (ciclo) => {
        return axios.post("http://localhost:3001/escuela/add_ciclo", ciclo);
    }
}