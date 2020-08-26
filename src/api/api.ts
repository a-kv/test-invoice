import axios from 'axios';
import {buyerType} from "../redux/buyersReducer";
import {terminalType} from "../redux/terminalsReducer";

const instanse = axios.create({
    baseURL: 'https://json-server-invoice.herokuapp.com'
    // baseURL: 'http://localhost:3004'
});
type CommonApiType<T> = {
    items: terminalType
    data: T
}
export type GetBuyerListApiType = Array<buyerType>
export type GetTerminalsListApiType = Array<terminalType>

export const buyersApi = {

    getBuyers(page: number, pageSize: number, sortFields: string, order: string) {
        return instanse.get<GetBuyerListApiType>(`/buyers?_page=${page}&_limit=${pageSize}&_order=${order}&_sort=${sortFields}` ).then(res => res)
    },
    getBuyer(id: string) {
        return instanse.get<buyerType>(`/buyers/${id}`).then(res => res)
    },
}
export const terminalsApi = {
    getTerminals() {
        return instanse.get<GetTerminalsListApiType>('/terminals').then(res => res)
    },
    addTerminal(title: string, description: string ) {
        return instanse.post<CommonApiType<{terminal: terminalType}>>('/terminals', {title: title, description: description}).then(res => res.data)
    },
    deleteTerminal(id:string) {
        return instanse.delete<CommonApiType<{}>>(`/terminals/${id}`).then(res => res)
    },

}



