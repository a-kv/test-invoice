import React from 'react';
import classNames from 'classnames'

type Props = {
    children?: string
    color?:  string
    disabled? : boolean,
    onClick?: () => void
};
const Button:React.FC<Props> = ({ children,color,onClick}) => {
    return (
            <button onClick={onClick}
                className={classNames('button',{
                'button-green': color === 'green',
            })}>
                {children}
            </button>
    );
};

export default Button
