import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from '../../services/storage';
// import Logo from '../../assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const token = StorageService.getCurrentUserToken();
  const user = StorageService.getCurrentUser();
  const firstName = user.fullName.split(' ')[0];
  const handleClickHome = () => {
    navigate('/trainee/home');
  };
  const handleLogOut = async () => {
    if (token) {
      localStorage.clear();
      navigate('/login');
    }
  };
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light bg-secondary'>
        <div className='container'>
          <div className='row'>
            <div className='col p-2'>
              <a
                style={{ cursor: 'pointer' }}
                onClick={handleClickHome}
                height='50'
                width='50'
              >
                Task Tracker
              </a>
              {/* <img
                src={Logo}
                style={{ cursor: 'pointer' }}
                onClick={handleClickHome}
                height='50'
                width='50'
              /> */}
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <p className='text-light'>
                <strong>Hi, {firstName}!</strong>
              </p>
            </div>
            <button className='btn btn-primary' onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
