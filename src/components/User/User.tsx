import * as React from 'react';
import '../../scss/sidebar.scss';

type propsType = {
    avatar_url: any
    login: string
}
export const User = (props: propsType) => {
    return (
        <div className='avatar'>
            <img alt="avatar" src={props.avatar_url}/>
            <div>
                <div>{props.login}</div>
            </div>
        </div>
    )
}

export const UserData = (props: any) => <div>{props.userData.map((u: any) => <User {...u} />)}</div>

