import axios from "axios";

export default class WorkPlaceService{
    getAll(){
        return axios.get("http://localhost:8080/api/workplaces/findAll")
    }
}