import axios from "axios"

export default class JobAdvertisement {
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobs/findAllByActiveTrueAndValidateTrueOrderByCreatedTimeDesc")
    }

    findByIdAndActiveTrueOrderByCreatedTimeDesc(id){
        return axios.get("http://localhost:8080/api/jobs/findAllByIdAndActiveTrueOrderByCreatedTimeDesc?id=" + id)
    }

    findAllByEmployerIdAndActiveTrue(id){
        return axios.get("http://localhost:8080/api/jobs/findAllByEmployerIdAndActiveTrueAndValidateTrue?employerId=" + id)
    }

    addJobAdvertisement(jobAdvertisement){
        return axios.post("http://localhost:8080/api/jobs/add", jobAdvertisement)
    }

    findAllByValidateFalseOrderByCreatedTimeDesc(){
        return axios.get("http://localhost:8080/api/jobs/findAllByValidateFalseOrderByCreatedTimeDesc")
    }

    setValidateValue(id, value){
        return axios.put("http://localhost:8080/api/jobs/setValidateValue?id=" + id + "&value=" + value)
    }
}