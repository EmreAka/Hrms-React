import axios from "axios";

export default class WorkTimeService{
    getAll(){
        return axios.get("http://localhost:8080/api/worktimes/findAll")
    }
}