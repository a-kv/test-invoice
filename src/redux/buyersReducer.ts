import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from './store';
import {buyersApi} from "../api/api";

export type buyerType = {
    id: string,
    buyerName: string,
    averageCheck: number,
    numberOfPurchases: number,
    totalRevenues: number
}

export type getBuyersAction = {
    type: 'BUYERS_REDUCER/GET_BUYERS',
    buyers: Array<buyerType>
}
export type setPageSizeAction = {
    type: 'BUYERS_REDUCER/SET_PAGE_SIZE',
    pageSize: number
}
export type setPageAction = {
    type: 'BUYERS_REDUCER/SET_PAGE',
    page: number
}
export type setOrderAction = {
    type: 'BUYERS_REDUCER/SET_ORDER',
    order: string
}
export type setSortFieldsAction = {
    type: 'BUYERS_REDUCER/SET_SORT_FIELDS',
    sortFields: string
}
type InitialStateType = {
    buyers: Array<buyerType>,
    currentPage: number,
    pageSize: number,
    totalCount: number,
    order: string,
    sortFields: string
}
const initialState: InitialStateType = {
    buyers: [],
    currentPage: 0,
    pageSize: 5,
    totalCount: 15,
    order: 'asc',
    sortFields: 'id'
};

type ActionsType = getBuyersAction | setPageAction | setPageSizeAction | setOrderAction | setSortFieldsAction


export const buyersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'BUYERS_REDUCER/GET_BUYERS':
            return {
                ...state,
                buyers: action.buyers
            }
        case 'BUYERS_REDUCER/SET_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'BUYERS_REDUCER/SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.pageSize
            }
        case 'BUYERS_REDUCER/SET_ORDER':
            return {
                ...state,
                order: action.order
            }
        case 'BUYERS_REDUCER/SET_SORT_FIELDS':
            return {
                ...state,
                sortFields: action.sortFields
            }

        default:
            return state;
    }
}

export const getBuyersAC = (buyers: Array<buyerType>): getBuyersAction => {
    return {type: 'BUYERS_REDUCER/GET_BUYERS', buyers}
}
export const setPageAC = (page: number): setPageAction => {
    return {type: 'BUYERS_REDUCER/SET_PAGE', page}
}
export const setPageSizeAC = (pageSize: number): setPageSizeAction => {
    return {type: 'BUYERS_REDUCER/SET_PAGE_SIZE', pageSize}
}
export const setOrderAC = (order: string): setOrderAction => {
    return {type: 'BUYERS_REDUCER/SET_ORDER', order}
}
export const setSortFieldsAC = (sortFields: string): setSortFieldsAction => {
    return {type: 'BUYERS_REDUCER/SET_SORT_FIELDS', sortFields}
}

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, {}, ActionsType>

export const getBuyers = (page: number, pageSize: number, sortFields: string, order: string) => (dispatch: ThunkDispatchType) => {
    buyersApi.getBuyers(page, pageSize, sortFields, order)
        .then(res => {
            dispatch(getBuyersAC(res.data))
        });
}
