import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from "redux-persist";
import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from '@reduxjs/toolkit'
import  UserReducer from "./slice/userSlice"
import AdminReducer from './slice/adminSlice'




const persistConfiq = {key:"root",storage,version:1};
const reducer = combineReducers({
    UserReducer,
    AdminReducer

});

const persistedReducer = persistReducer(persistConfiq,reducer);
const store = configureStore({
    reducer:persistedReducer,
});

const persistor = persistStore(store)

export {store,persistor}