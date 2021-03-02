import { combineReducers } from 'redux'
import { userReducer } from './user'
import {setMainAlbum} from './album'


export const rootReducer = combineReducers({
    user: userReducer,
    albums: setMainAlbum
})