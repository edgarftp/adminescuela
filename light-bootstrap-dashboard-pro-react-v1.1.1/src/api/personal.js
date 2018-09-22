import axios from "axios";

export default {

    getAllProfesores: () => {
        return axios.get("http://localhost:3001/personal/get_profesores");
    },
    
    addProfesor: (profesor) => {
        return axios.post("http://localhost:3001/personal/add_profesor", profesor);
    }
}