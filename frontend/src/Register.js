import React, { useState } from "react";
import axios from 'axios';

const registerURL = '';


function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (username.trim() === '' || email.trim() === '' || name.trim() === '' || password.trim() === '') {
            setMessage('All fields are required!')
        }

        const requestConfig = {
            headers: {
                'x-api-key': '',
            }
        }

        const requestBody = {
            username: username,
            email: email,
            name: name,
            password: password
        }
        axios.post(registerURL, requestBody, requestConfig).then(response => setMessage('Registration Successful')).catch(error => {
            if(error.response.status === 401){
                setMessage(error.response.data.message);
            } else {
                setMessage('sorry... the backend server is down, please try again later!')
            }
        })
    }
    
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
                username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
                <input type="submit" value="Register" />                
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    )
};

export default Register;
