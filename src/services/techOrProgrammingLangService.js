import axios from "axios";

export default class TechOrProgrammingLangService{
    getAllByCvId(cvId){
        return axios.get("http://localhost:8080/api/TechnologyAndProgrammingLanguages/findByCvId?id=" + cvId)
    }

    addTechOrProgrammingLangService(techOrProgrammingLangService){
        return axios.post("localhost:8080/api/TechnologyAndProgrammingLanguages/add", techOrProgrammingLangService)
    }
}