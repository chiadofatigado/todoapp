import React, { useState } from 'react';
import axios from 'axios';


export default function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const cancel = (e) => {
    e.preventDefault();
    setName('');
    setUsername('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, username, email, password };

    console.log(data);

    axios.post('http://localhost:3000/api/users/register', data)
    .then(response => {
      console.log('Success:', response.data);
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div className="columns">
      <div className="column">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div classname="field is-grouped">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input 
                className="input" 
                type="text" 
                placeholder="Text input"
                value={name}
                onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  defaultValue=""
                  value={username}
                  onChange={handleUsernameChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              {/* <p className="help is-success">This username is available</p> */}
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email input"
                  defaultValue=""
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
                  defaultValue=""
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" /> I agree to the{" "}
                  <a href="#">terms and conditions</a>
                </label>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Submit</button>
              </div>
              <div className="control">
                <button className="button is-link is-light" onClick={cancel}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};