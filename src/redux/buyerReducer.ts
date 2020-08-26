// @ts-ignore
import { ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from './store';
import {buyersApi} from "../api/api";

export type buyerType = {
    id: string,
    buyerName: string,
    averageCheck: number,
    numberOfPurchases: number,
    totalRevenues: number
}

export type getBuyerAction = {
    type: 'BUYER_REDUCER/GET_BUYER',
    buyer: buyerType
}
const initialState: Array<buyerType> = [];

type ActionsType = getBuyerAction

export const buyerReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'BUYER_REDUCER/GET_BUYER':
           return action.buyer
        default:
            return state;
    }
}

export const getBuyerAC = (buyer: buyerType): getBuyerAction => {
    return {type: 'BUYER_REDUCER/GET_BUYER', buyer}
}

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, {}, ActionsType>

export const getBuyer = (id: string) => (dispatch: ThunkDispatchType) => {
    buyersApi.getBuyer(id)
        .then(res => {
            dispatch(getBuyerAC(res.data))
        });
}
