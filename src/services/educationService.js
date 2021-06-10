import axios from "axios";

export default class EducationService{
    
    getByCvId(cvId){
        return axios.get("http://localhost:8080/api/educations/findAllByCvIdOrderByFinishDateDesc?cvId=" + cvId)
    }
}