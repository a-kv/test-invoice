import React from 'react';
import {Field, Form, reduxForm} from "redux-form";

const LoginForm = (props: any) => {
    const {handleSubmit} = props;

    return <>
        <h2>Hello!</h2>
        <span>If you want to try using this app, enter:</span>
        <div>email: test@gmail.com</div>
        <div>password: test</div>

        <div>Never enter your real data</div>
        <br/>

        <Form onSubmit={props.handleSubmit}>
            <Field component={"input"} name={'email'} placeholder='Email'/><br/>
            <Field component={"input"} name={'password'} placeholder='Password' type={'password'}/>
            <div>
                <button>Sing in</button>
            </div>
        </Form></>
}


export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);