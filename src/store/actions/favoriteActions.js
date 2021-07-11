import FavoriteService from "../../services/favorite";

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE"
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE"

export function addToFavorite(job) {
    return {
        type: ADD_TO_FAVORITE,
        payload: job
    }
}

export function removeFromFavorite(job) {
    return {
        type: REMOVE_FROM_FAVORITE,
        payload: job
    }
}

export function fetchFavorites() {
    return async (dispatch, getState) => {
        let favoriteService = new FavoriteService()
        const response = await favoriteService.getByEmployeeId(1)
        console.log(response.data)
        dispatch({
            type: "FETCH_FAVORITES",
            payload: response.data
        })
    }
}