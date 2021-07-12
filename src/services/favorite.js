import axios from "axios";

export default class FavoriteService{
    getByEmployeeId(id){
        return axios.get("http://localhost:8080/api/favorites/findAllByEmployeeId?id=" + id)
    }

    findAllFavoriteJobs(){
        return axios.get("http://localhost:8080/api/favorites/findAll")
    }

    addFavorite(Favorite){
        return axios.post("http://localhost:8080/api/favorites/add", Favorite)
    }

    deleteFavorite(Favorite) {
        return axios.delete("http://localhost:8080/api/favorites/delete", Favorite)
    }

    deleteFavoriteByFavoriteId(id) {
        return axios.delete("http://localhost:8080/api/favorites/deleteById?id=" + id)
    }
}