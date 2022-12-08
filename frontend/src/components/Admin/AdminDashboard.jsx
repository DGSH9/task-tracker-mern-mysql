import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import StorageService from '../../services/storage';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const user = StorageService.getCurrentUser();
  const token = StorageService.getCurrentUserToken();
  if (token && user.role !== 'admin') return <Navigate to={'/login'} />;

  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <div
            style={{
              minHeight: '100px',
              marginLeft: '-25px',
              background: 'darkgray',
            }}
            className='bg-muted'
          >
            <Header />
          </div>
          <div
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              height: '500px',
            }}
          >
            <Content />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
