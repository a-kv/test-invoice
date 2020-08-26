import React, {useState} from 'react';
import './scss/App.scss';
import {Route, Switch} from 'react-router-dom';
import {SideBar} from "./components/SideBar";
import {Buyers} from './components/Buyers/Buyers';
import {Terminals} from './components/Terminals/Terminals';
import {Error} from './components/Error/Error';
import {LoginForm} from './components/Login/LoginForm';
import { Buyer } from './components/Buyers/Buyer/Buyer';


const App = () => {

    const [isAuth, setIsAuth] = useState(false)
    const [userData, setUserData] = useState([])

    const authUser = (userInfo: any) => {
        setUserData(userData.concat(userInfo))
    }

    return (
        <div className="App">
            <SideBar isAuth={isAuth} userData={userData}/>
            <div className='wrapper'>
                <Switch>
                    <Route exact path={'/'} render={() => <LoginForm onSubmit={authUser} isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
                    <Route exact path={'/buyers'} render={() => <Buyers isAuth={isAuth}/>}/>
                    <Route exact path={'/buyers/:id'} render={() => <Buyer isAuth={isAuth}/>}/>
                    <Route exact path={'/terminals'} render={() => <Terminals isAuth={isAuth}/>}/>
                    <Route path={'/*'} render={() => <Error/>}/>
                </Switch>
            </div>
        </div>
    );
};

export default App;
