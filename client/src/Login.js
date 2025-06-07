import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Typography from '@mui/material/Typography';
import LoginForm from './LoginForm';
import LOGIN_MUTATION from './queries/loginMutation';

const LoginPage = () => {
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  
    const handleLogin = ({ email, password }) => {
      login({
        variables: {
          email,
          password,
        },
      })
        .then((res) => {
          let token = res.data.signIn.token;
          sessionStorage.setItem('token', token);
          setToken(token);
          console.log(token);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  

return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ m: 2 }}>
        Login
      </Typography>
      <LoginForm onSubmit={handleLogin} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default LoginPage;