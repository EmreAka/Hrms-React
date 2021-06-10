import axios from "axios"

export default class JobAdvertisement {
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobs/findAllByActiveTrue")
    }

    findByIdAndActiveTrueOrderByCreatedTimeDesc(id){
        return axios.get("http://localhost:8080/api/jobs/findAllByIdAndActiveTrueOrderByCreatedTimeDesc?id=" + id)
    }

    findAllByEmployerIdAndActiveTrue(id){
        return axios.get("http://localhost:8080/api/jobs/findAllByEmployerIdAndActiveTrue?employerId=" + id)
    }

    addJobAdvertisement(jobAdvertisement){
        return axios.post("http://localhost:8080/api/jobs/add", jobAdvertisement)
    }
}