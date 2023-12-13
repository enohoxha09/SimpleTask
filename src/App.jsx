import React, { useState } from 'react';
import Login from './views/Login';
import DynamicForm from './views/DynamicForm';
import './Index.css';

function App() {
  const [sessionToken, setSessionToken] = useState(null);
  const [userId, setUserId] = useState('');

  const handleLogin = (token, userId) => {
    console.log(token);
    setUserId(userId);
    setSessionToken(token);
    localStorage.setItem('sessionToken', token);
  };

  return (
    <div className='App'>
      {!sessionToken ? (
        <Login onLogin={handleLogin} />
      ) : (
        <DynamicForm sessionToken={sessionToken} userId={userId} />
      )}
    </div>
  );
}

export default App;
