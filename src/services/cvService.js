import axios from "axios";

export default class CvService{
    getCvs(){
        return axios.get("http://localhost:8080/api/cvs/getAll")
    }

    getCvsByEmployeeId(employeeId){
        return axios.get("http://localhost:8080/api/cvs/findAllByEmployeeId?employeeId=" + employeeId)
    }

    getCvsById(cvId){
        return axios.get("http://localhost:8080/api/cvs/findAllById?id=" + cvId)
    }

    addCv(cv){
        return axios.post("http://localhost:8080//api/cvs/add", cv)
    }
}