import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../actions/favoriteActions";
import { favoriteJobs } from "../initialValues/favoriteJobs"

const initialState = {
    favoriteJobs: favoriteJobs
}

export default function favoriteReducer(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_TO_FAVORITE:
            let job = state.favoriteJobs.find(j => j.job.id === payload.id)
            if (job) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    favoriteJobs:[...state.favoriteJobs, {job: payload}]
                }
            }
        case REMOVE_FROM_FAVORITE:
            return{
                ...state,
                favoriteJobs:state.favoriteJobs.filter(j => j.job.id !== payload.id)
            }
        default:
            return state
    }
}