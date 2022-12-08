import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRoute } from '../utils/APIRoutes';
// import AuthService from '../services/storage.service';
import StorageService from '../services/storage';
import Header from './Header';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const validateForm = () => {
    const { email, password } = values;
    if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Password is required.', toastOptions);
      return false;
    }
    return true;
  };

  const token = StorageService.getCurrentUserToken();
  const currentUser = StorageService.getCurrentUser();
  useEffect(() => {
    if (token && currentUser.role === 'admin') {
      navigate('/admin');
    }
    if (token && currentUser.role === 'trainee') {
      navigate('/trainee/home');
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const data = await axios.put(userRoute, {
        email,
        password,
      });
      if (data.status !== 200) {
        toast.error(data.message, toastOptions);
      }

      if (data.status === 200) {
        await StorageService.storeUserData(data.data.token, data.data.profile);
      }
      // console.log(data);
      if (data.data.profile.role === 'admin') {
        navigate('/admin');
      }
      if (data.data.profile.role === 'trainee') {
        navigate('/trainee/home');
      }
    }
  };

  if (token) {
    return <Navigate to={'/trainee'} />;
  } else {
    return (
      <>
        <Header />
        <FormContainer>
          <form action='' onSubmit={(event) => handleSubmit(event)}>
            <div className='brand'>
              {/* <img src={Logo} alt='logo' /> */}
              <h1>Task Tracker</h1>
            </div>

            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={(e) => handleChange(e)}
              min='3'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => handleChange(e)}
            />
            <button type='submit'>Log In</button>
            <span>
              Don't have an account ? <Link to='/register'>Create One.</Link>
            </span>
          </form>
        </FormContainer>
        <ToastContainer />
      </>
    );
  }
}

export default Login;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
