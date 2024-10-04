import React, { useState } from "react";
import axios from 'axios';
import { setUserSession } from './services/authServices';
const loginURL = '';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if(username.trim() === '' || password.trim() === '') {
            setErrorMessage('Both username and password are required');
            return;
        }
        setErrorMessage(null);
        const requestConfig = {
            headers: {'x-api-key': ''}
        }
        const requestBody = {
            username: username,
            passoword: password
        }
        axios.post(loginURL, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            props.history.push('/premium-content');
            
        }).catch(error => {
            console.log(error);
            setErrorMessage('Invalid username or password');
        });
    } 
    
    return (
        <div>
           <form onSubmit={submitHandler} >
            username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
            password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
            <input type="submit" value="login" />
            </form>
        {errorMessage && <p className='message'>{errorMessage}</p>}
        </div>
    )
};

export default Login;
