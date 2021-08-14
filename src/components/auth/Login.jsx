import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import clientAxios from '../../config/Axios';
import Swal from 'sweetalert2';

// Context
import { AuthContext } from '../../context/AuthContext';

const Login = (props) => {
  //State para Login
  const [auth, setAuth] = useContext(AuthContext);
  const [credentials, setCredentials] = useState({});

  // Iniciar sesión en el servidor
  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await clientAxios.post('/login', credentials);
      // Extraer el access_token
      const access_token = response.data.access_token;
      const username = response.data.username;

      localStorage.setItem('access_token', access_token);
      localStorage.setItem('username', username);

      setAuth({
        access_token,
        auth: true,
      });

      Swal.fire({
        icon: 'success',
        title: '¡Login Correcto!',
        text: 'Has Iniciado Sesión',
      });
      props.history.push('/');
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: '¡Verifica tus datos!',
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Algo Ha Salido mal!',
          text: 'Hubo un error',
        });
      }
    }
  };
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='form-user'>
      <div className='container-form shadow-dark'>
        <h1>Login</h1>
        <Form onSubmit={login}>
          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              id='InputEmail'
              name='username'
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              id='InputPassword'
              name='password'
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className='btn btn-primary btn-block' type='submit'>
            Iniciar Sesión
          </Button>
        </Form>
        <Link to={'/register'} className='link-register'>
          Registrarme
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
