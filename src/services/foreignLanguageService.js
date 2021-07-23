import axios from "axios";

export default class ForeignLanguageService{
    getAllByCvId(cvId){
        return axios.get("http://localhost:8080/api/foreignLanguages/findAllByCvId?id=" + cvId)
    }

    addForeignLanguage(foreignLanguage){
        return axios.post("http://localhost:8080/api/foreignLanguages/add", foreignLanguage)
    }

    deleteForeignLanguageById(id) {
        return axios.delete("http://localhost:8080/api/foreignLanguages/deleteById?id=" + id)
    }
}