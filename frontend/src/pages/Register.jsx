import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import Logo from '../assets/logo.svg';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { userRoute } from '../utils/APIRoutes';
import StorageService from '../services/storage';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleValidation = () => {
    const { password, confirmPassword, fullName, email } = values;
    if (fullName === '') {
      toast.error('Please Enter FullName', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Please enter Email', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Please Enter Password 8 character or greater', toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error('Password and Confirm Password are not same', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, fullName, password } = values;
      const data = await axios.post(userRoute, {
        email,
        fullName,
        password,
      });
      console.log(data);
      if (data.status === 201) {
        toast.success(data.message, toastOptions);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

      if (data.status !== 201) {
        toast.error(data.message, toastOptions);
      }
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <form
          action=''
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className='brand'>
            {/* <img src={Logo} alt='logo'></img> */}
            <h1>Task Tracker</h1>
          </div>

          <input
            type='text'
            placeholder='Full Name'
            name='fullName'
            onChange={(e) => handleChange(e)}
          />

          <input
            type='email'
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)}
          />

          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />

          <input
            type='password'
            placeholder='ConfirmPassword'
            name='confirmPassword'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Create User</button>
          <span>
            Already have an account ? <Link to='/login'>Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;

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
    padding: 3rem 5rem;
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
