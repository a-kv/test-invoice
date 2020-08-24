// @ts-ignore
import { ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from './store';
import {buyersApi} from "../api/api";

export type buyerType = {
    buyerId: string,
    buyerName: string,
    averageCheck: number,
    numberOfPurchases: number,
    totalRevenues: number
}

export type getBuyersAction = {
    type: 'BUYERS_REDUCER/GET_USER_DATA',
    buyers: Array<buyerType>
}
const initialState: Array<buyerType> = [];

type ActionsType = getBuyersAction

export const buyersReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'BUYERS_REDUCER/GET_USER_DATA':
                const buyers = action.buyers.map(c => ({...c}))
                return [...buyers]

        default:
            return state;
    }
}
export const getBuyersAC = (buyers: Array<buyerType>): getBuyersAction => {
    return {type: 'BUYERS_REDUCER/GET_USER_DATA', buyers}
}



export type ThunkDispatchType = ThunkDispatch<AppRootStateType, {}, ActionsType>



export const getBuyers = () => (dispatch: ThunkDispatchType) => {
    buyersApi.getBuyers()
        .then(res => {
            dispatch(getBuyersAC(res.data))
        });
}
