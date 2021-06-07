import axios from "axios"

export default class Employer{
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }
}