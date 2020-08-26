import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from './store';
import {terminalsApi} from "../api/api";

export type terminalType = {
    id: string,
    title: string,
    description: string
}

export type removeTerminalActionType = {
    type: 'TERMINALS_REDUCER/REMOVE_TERMINAL',
    id: string
}
export type addTerminalActionType = {
    type: 'TERMINALS_REDUCER/ADD_TERMINAL',
    newTerminal: terminalType
}
export type getTerminalActionType = {
    type: 'TERMINALS_REDUCER/GET_TERMINALS',
    terminals: Array<terminalType>
}
const initialState: Array<terminalType> = [];

type ActionsType = getTerminalActionType | addTerminalActionType | removeTerminalActionType

export const terminalsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'TERMINALS_REDUCER/REMOVE_TERMINAL': {
            return state.filter(c => c.id != action.id)
        }
        case 'TERMINALS_REDUCER/ADD_TERMINAL': {
            return [...state, {
                id: action.newTerminal.id,
                title: action.newTerminal.title,
                description: action.newTerminal.description
            }]
        }
        case 'TERMINALS_REDUCER/GET_TERMINALS':
            const terminals = action.terminals.map(t => ({...t}))
            return [...terminals]
        default:
            return state;
    }
}
export const getTerminalAC = (terminals: Array<terminalType>): getTerminalActionType => {
    return {type: 'TERMINALS_REDUCER/GET_TERMINALS', terminals}
}
export const addTerminalAC = (newTerminal: terminalType): addTerminalActionType => {
    return {type: 'TERMINALS_REDUCER/ADD_TERMINAL', newTerminal}
}
export const removeTerminalAC = (id: string): removeTerminalActionType => {
    return {type: 'TERMINALS_REDUCER/REMOVE_TERMINAL', id}
}

export type ThunkDispatchType = ThunkDispatch<AppRootStateType, {}, ActionsType>

export const getTerminals = () => (dispatch: ThunkDispatchType) => {
    terminalsApi.getTerminals()
        .then(res => {
            dispatch(getTerminalAC(res.data))
        });
}

export const addNewTerminal = (title: string, description: string) => (dispatch: ThunkDispatchType) => {
    terminalsApi.addTerminal(title, description)
        .then(res => {
            const newTerminal = res;
            // @ts-ignore
            dispatch(addTerminalAC(newTerminal))
        });
}
export const removeTerminal = (id: string) => (dispatch: ThunkDispatchType) => {
    terminalsApi.deleteTerminal(id)
        .then(res => {
            dispatch(removeTerminalAC(id))
        });
}
