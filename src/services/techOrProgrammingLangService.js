import axios from "axios";

export default class TechOrProgrammingLangService{
    getAllByCvId(cvId){
        return axios.get("http://localhost:8080/api/TechnologyAndProgrammingLanguages/findByCvId?id=" + cvId)
    }

    addTechOrProgrammingLangService(techOrProgrammingLangService){
        return axios.post("http://localhost:8080/api/TechnologyAndProgrammingLanguages/add", techOrProgrammingLangService)
    }

    deleteById(id){
        return axios.delete("http://localhost:8080/api/TechnologyAndProgrammingLanguages/deleteById?id=" + id)
    }
}