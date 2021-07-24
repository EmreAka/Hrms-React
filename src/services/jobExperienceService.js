import axios from "axios";

export default class JobExperienceService{
    getJobExperienceServicesByCvId(cvId){
        return axios.get("http://localhost:8080/api/jobExperiences/findAllByCvIdOrderByFinishDateDesc?cvId=" + cvId)
    }

    addJobExperience(jobExperience){
        return axios.post("http://localhost:8080/api/jobExperiences/add", jobExperience)
    }

    deleteById(id){
        return axios.delete("http://localhost:8080/api/jobExperiences/deleteById?id=" + id)
    }
}