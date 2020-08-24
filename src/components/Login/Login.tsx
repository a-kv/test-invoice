import React from 'react';
import {LoginReduxForm} from "./LoginForm";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function Login() {

    const [isAuth, setIsAuth] = React.useState(false);

    const sendForm = (formData: any) => {
        axios.post('https://test-app-contacts.herokuapp.com/login', formData)
        if (formData.email === "test@gmail.com" && formData.password === "test") {
            setIsAuth(true);
        } else {
            alert('error')
            setIsAuth(false);
        }
    }

    if (isAuth) return <Redirect to="/contactsList"/>;

    return (
        <div>
            <LoginReduxForm onSubmit={sendForm}/>
        </div>
    );
}

export default Login;
