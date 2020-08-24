import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import loginReducer from "./reducers/loginReducer";
import registrationReducer from "./reducers/registrationReducer";
import newPwReducer from "./reducers/newPwReducer";
import profileReducer from "./reducers/profileReducer";
import recoverPwReducer from "./reducers/recoverPwReducer";
import packReducer from "./reducers/packReducer";
import cardsReducer from "./reducers/cardsReducer";
import filterReducer from "./reducers/filterReducer";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    newPassword: newPwReducer,
    profile:profileReducer,
    recoverPassword:recoverPwReducer,
    packs: packReducer,
    cards: cardsReducer,
    filter:filterReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store

export default store