import React, {useEffect, useState} from 'react';
import '../../scss/terminals.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {addNewTerminal, getTerminals, removeTerminal, terminalType} from "../../redux/terminalsReducer";
import {Redirect} from "react-router-dom";

type propsType = {
    isAuth: boolean
}

export const Terminals = ({isAuth}: propsType) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const terminals = useSelector<AppRootStateType, Array<terminalType>>(state => state.terminals)
    const dispatch = useDispatch();

    useEffect(() => {
        if (terminals) {
            dispatch(getTerminals())
        }
    }, [])

    const addTerminal = () => {
        dispatch(addNewTerminal(title, description))
        setTitle('')
        setDescription('')
    }
    const remTerminal = (id: string) => {
        dispatch(removeTerminal(id))
    }
    if (!isAuth) {
        return <Redirect to='/'/>
    }
    return (
            <div className='terminals'>

                <div className='titleWrap'>
                    <div className='title'> TERMINALS</div>
                    <div className='setting'><input
                        type="terminalName"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder="Terminal name"
                        required
                    />
                        <input
                            type="description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            placeholder="Description"
                            required
                        />
                        <button onClick={addTerminal}>add</button>
                    </div>
                </div>
                <div className="tableWrap" >
                    <table className="table" id='table'>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                        </tr>
                        {terminals.map(t => <tr key={t.id}>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <button onClick={() => {remTerminal(t.id)}}>delete
                                </button>
                            </tr>
                        )}
                    </table>
                </div>
            </div>
    );
};
