import { ADD_TO_FAVORITE, FETCH_FAVORITE_JOBS, REMOVE_FROM_FAVORITE } from "../actions/favoriteActions";
import { favoriteJobs } from "../initialValues/favoriteJobs"

const initialState = {
    favoriteJobs: favoriteJobs
}

export default function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_FAVORITE:
            let job = state.favoriteJobs.find(j => j.job.id === action.payload.id)
            if (job) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    favoriteJobs:[...state.favoriteJobs, {job: action.payload}]
                }
            }
        case REMOVE_FROM_FAVORITE:
            return{
                ...state,
                // favoriteJobs:state.favoriteJobs.filter(j => j.id !== action.payload.id)
                favoriteJobs:[...action.payload]
            }

        case FETCH_FAVORITE_JOBS:
            let favoritesInmemory = state.favoriteJobs
            let favoritesInDb = action.payload
            let yeniArray = []
            favoritesInDb.map(item => (yeniArray = favoritesInmemory.find(fav => fav.id === item.id)))
            if (yeniArray) {
                return {...state}
            } else {
                return {
                ...state,
                favoriteJobs:[...action.payload]
            }
            }
            
        default:
            return state
    }
}