import * as React from 'react';
import classNames from "classnames";
import {ChangeEvent} from "react";

type Props = {
    type: string
    placeholder?: string,
    onChange?: (e:ChangeEvent<HTMLInputElement>)=> void,
    error?: any
    value?: string
    onKeyPress?:any
};
const Field: React.FC<Props> = ({type, placeholder, onChange, error,onKeyPress,value}) => {

    return (
        <input onChange={onChange}
               value={value}
               onKeyPress={onKeyPress}
               placeholder={placeholder}
               type={type}
               className={classNames('field',{
                   'field-error': error === true
               })}
        />
    );
};

export default Field