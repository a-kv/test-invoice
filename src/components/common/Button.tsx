import React from 'react';
import classNames from 'classnames'
import {statuses} from "../redux/reducers/loginReducer";

type Props = {
    children?: string
    color?:  string
    disabled? : boolean,
    onClick?: () => void
    isLoading?: boolean
    status?:string
    card?: any
};
const Button:React.FC<Props> = ({card, children,color,disabled,onClick,status}) => {
    return (
            <button onClick={onClick}
                className={classNames('button',{
                'button-green': color === 'green',
                'button-gray': color === 'gray',
                'button-red': color === 'red',
                'button-blue': color === 'blue',
                'button-disabled' : disabled || status === statuses.INPROGRESS
            })}>
                {children}
            </button>
    );
};

export default Button