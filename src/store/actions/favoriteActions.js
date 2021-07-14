import FavoriteService from "../../services/favorite";
import {toast} from "react-toastify";

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE"
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE"
export const FETCH_FAVORITE_JOBS = "FETCH_FAVORITE_JOBS"

let favoriteJobsService = new FavoriteService()

export function addToFavorite(favorite) {
    return async (dispatch, getState) => {
        const responseAddFavorite =  await favoriteJobsService.addFavorite(favorite)
        const response = await favoriteJobsService.findAllFavoriteJobs()
        console.log(responseAddFavorite.data.success)
        if (responseAddFavorite.data.success){
            toast.success(`${responseAddFavorite.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.error(`${responseAddFavorite.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        dispatch({
            type: ADD_TO_FAVORITE,
            payload: response.data.data
        })
    }
}

export function removeFromFavorite(favorite) {
    return async (dispatch, getState) => {
        const responseFavoriteDelete = await favoriteJobsService.deleteFavoriteByFavoriteId(favorite.id)
        const response = await favoriteJobsService.findAllFavoriteJobs()
        console.log(responseFavoriteDelete.data.success)
        if (responseFavoriteDelete.data.success){
            toast.success(`${responseFavoriteDelete.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            toast.error(`${responseFavoriteDelete.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        dispatch({
            type: REMOVE_FROM_FAVORITE,
            payload: response.data.data
        })
    }
}

export function fetchFavoriteJobs() {
    return async (dispatch, getState) => {
        const response = await favoriteJobsService.findAllFavoriteJobs()
        // console.log(response.data.data)
        dispatch({
            type: FETCH_FAVORITE_JOBS,
            payload: response.data.data
        })
    }
}