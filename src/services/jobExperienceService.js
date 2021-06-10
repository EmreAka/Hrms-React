import axios from "axios";

export default class JobExperienceService{
    getJobExperienceServicesByCvId(cvId){
        return axios.get("http://localhost:8080/api/jobExperiences/findAllByCvIdOrderByFinishDateDesc?cvId=" + cvId)
    }
}