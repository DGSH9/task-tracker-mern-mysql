import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StorageService from '../../services/storage';

const Header = () => {
  const user = StorageService.getCurrentUser();
  const token = StorageService.getCurrentUserToken();
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log(token);
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
    <>
      <div className='row'>
        <div className='col-9'></div>
        <div className='col-3' style={{ marginTop: '30px' }}>
          <div className='row'>
            <div className='col float-right'>
              {' '}
              <h6 style={{ padding: '6px 0px 0px 26px' }}>
                Hi! {user.fullName}
              </h6>{' '}
            </div>
            <div className='col'>
              {' '}
              <button className='btn btn-primary' onClick={handleLogOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
