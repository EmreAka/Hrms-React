import axios from "axios";

export default class EducationService{
    
    getByCvId(cvId){
        return axios.get("http://localhost:8080/api/educations/findAllByCvIdOrderByFinishDateDesc?cvId=" + cvId)
    }

    addEducation(education){
        return axios.post("http://localhost:8080//api/educations/add", education)
    }

    deleteByID(id){
        return axios.delete("http://localhost:8080/api/educations/deleteById?id=" + id)
    }
}