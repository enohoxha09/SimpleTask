import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('_operation', 'login');
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'https://demo.bspvision.com/modules/Mobile/api.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      const sessionToken = response.data.result.login.session;
      const userId = response.data.result.login.userid;
      console.log('Extracted session token:', sessionToken);

      if (sessionToken) {
        onLogin(sessionToken, userId);
      } else {
        console.error('Session token not found in response');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div  style={{ height: '100vh'}}>
    <form 
      className='form-container'
      style={{ height: '300px' }}
      onSubmit={handleSubmit}
    >
      <input
        className='input-field'
        type='text'
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        className='input-field'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button className='login-button' type='submit'>
        Login
      </button>
    </form>
    </div>
  );
}

export default Login;
