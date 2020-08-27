import {Redirect} from 'react-router-dom';
import '../../scss/login.scss';
import React, {useState} from 'react';
import axios from 'axios';

type propsType = {
    onSubmit: (userInfo: any) => void
    isAuth: boolean
    setIsAuth: any
}

export const LoginForm = (props: propsType) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: any) => {
        setUserNameError('')
        setPasswordError('')
        event.preventDefault()
        if(validate()) {
            axios
                .get(`https://api.github.com/users/${userName}`)
                .then(res => {
                    props.onSubmit(res.data)
                    setUserName('')
                    if (userName !== '') {
                        props.setIsAuth(true)
                    }
                })
                .catch(e => {
                    if(e.response.status === 404) {
                        let userNameError = 'User does not exist';
                        setUserNameError(userNameError)
                        props.onSubmit(e.message)
                        props.setIsAuth(false)
                    }
                })
        }
    }
    if (props.isAuth) {
        return <Redirect to='/buyers'/>
    }
    const validate = () => {
        const Digit = /[0-9]/.test(password)
        const Upper = /[A-Z]/.test(password)

        if (password.length < 8 || !( Digit && Upper)) {
            let passwordError = 'Password must be more than 8 characters, at least 1 uppercase latin letter and at least 1 numeral....'
            setPasswordError(passwordError)
            return false
        }
        return true
    }

    return <div className='login-wrap'>
        <form onSubmit={handleSubmit} className='login-form'>
            <input
                type="text"
                value={userName}
                onChange={event => setUserName(event.target.value)}
                placeholder="GitHub username"
                required
            />
            <span className='error_message'>{userNameError}</span>

            <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Your password"
                required
            />
            <span className='error_message'>{passwordError}</span>

            <button type="submit">Sing in</button>
        </form>
    </div>
}


