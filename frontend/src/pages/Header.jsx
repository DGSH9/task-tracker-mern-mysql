import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-light bg-secondary'>
        <div className='container'>
          <div className='row'>
            <div className='col p-2'>
              <a style={{ cursor: 'pointer' }} height='50' width='50'>
                Task Tracker
              </a>
            </div>
          </div>
        </div>
        <Link to='/login'>
          <button className='me-0 btn btn-primary'>Login</button>
        </Link>
        <Link to='/register'>
          <button className='me-4 ms-4 btn btn-primary'>Register</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
