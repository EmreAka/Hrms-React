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
                favoriteJobs:state.favoriteJobs.filter(j => j.job.id !== action.payload.id)
            }

        case FETCH_FAVORITE_JOBS:
            return {
                ...state,
                favoriteJobs:[...state.favoriteJobs, ...action.payload]
            }
        default:
            return state
    }
}