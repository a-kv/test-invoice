import * as React from 'react';

import '../scss/sidebar.scss';

type propsTypew = {
    userData: any
}

export const SideBar = React.memo((props: propsTypew) => {

    return (
        <div className='side-bar'>
            <UserData userData={props.userData}/>
            <div>Terminals</div>
            <div>Buyers</div>
            {console.log('render')}
        </div>
    );
});

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
                {/*<div>{props.blog}</div>*/}
            </div>
        </div>
    )
}

const UserData = (props: any) => <div>{props.userData.map((u:any) => <User {...u} />)}</div>

