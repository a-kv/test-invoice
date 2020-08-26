import {applyMiddleware, combineReducers, createStore} from "redux";
import {terminalsReducer} from "./terminalsReducer";
import {buyersReducer} from "./buyersReducer";
import thunk from "redux-thunk";
import {buyerReducer} from "./buyerReducer";

const rootReducer = combineReducers({
    buyers: buyersReducer,
    buyer: buyerReducer,
    terminals: terminalsReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store

export default store
