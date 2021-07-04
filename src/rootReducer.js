import { combineReducers } from "redux";
import favoriteReducer from "./store/reducers/favoriteReducer";

const rootReducer = combineReducers({
    favorite: favoriteReducer
})

export default rootReducer