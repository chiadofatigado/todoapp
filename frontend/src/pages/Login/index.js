import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Use this to redirect to home page after login
    const [user, setUser] = useState({}); // TODO: Use this to store user data after login [username, email]
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const cancel = (event) => {
        event.preventDefault();
        setEmail('');
        setPassword('');
        setIsError(false);
        setErrorMessage('');
        setUser({});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { email, password };

        console.log(data);

        axios.post('http://localhost:3000/api/users/login', data)
            .then(response => {
                console.log('Success:', response.data);
                setEmail('');
                setPassword('');
                setUser(response.data);
                setIsError(false);
                setErrorMessage('');
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setIsError(true);
                    setErrorMessage(error.response.data ? error.response.data.message : 'Unknown error');
                
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    setIsError(true);
                    setErrorMessage('No response received from server');
                
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    setIsError(true);
                    setErrorMessage(error.message ? error.message : 'Unknown error');
                
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.error('Error:', error.toJSON());
            });
    }

    return (
        <div className="columns">
            <div className="column">
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope" />
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-exclamation-triangle" />
                            </span>
                        </div>
                        {/*<p className="help is-danger">This email is invalid</p> */}
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <label className="checkbox">
                                <input type="checkbox" /> Keep me logged in
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        {isError && <p className='help is-danger'>Error: {errorMessage}</p>}
                        {user.username && user.email ? <p className='help is-success'>Success: {user.username} is logged in, with the email {user.email} </p>: ''}
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Login</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={cancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};