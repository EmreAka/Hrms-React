import axios from "axios";

export default class FavoriteService{
    getByEmployeeId(id){
        return axios.get("http://localhost:8080/api/favorites/findAllByEmployeeId?id=" + id)
    }

    addFavorite(Favorite){
        return axios.post("http://localhost:8080/api/favorites/add", Favorite)
    }
}