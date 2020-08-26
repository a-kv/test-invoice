import * as React from 'react';
import '../scss/sidebar.scss';
import {UserData} from "./User/User";
import {NavLink} from 'react-router-dom';

type propsType = {
    userData: any
    isAuth: boolean
}

export const SideBar = React.memo((props: propsType) => {
    return (
        <div className='side-bar'>
            {props.isAuth ?
                <UserData userData={props.userData}/>
                : <div></div>
            }
            <div className='links'>
                <NavLink to={'/terminals'}>
                    Terminals
                </NavLink>
                <NavLink to={'/buyers'}>Buyers</NavLink>
            </div >
            {console.log('render')}
            <div  className='text'>Copyright © 2020</div>
        </div>
    );
});
