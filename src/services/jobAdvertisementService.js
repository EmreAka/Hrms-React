import axios from "axios"

export default class JobAdvertisement {
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobs/findAllByActiveTrue")
    }

}