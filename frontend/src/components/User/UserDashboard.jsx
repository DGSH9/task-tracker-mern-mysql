import React from 'react';
import { Navigate } from 'react-router-dom';
import StorageService from '../../services/storage';
import Content from './Content';
import Header from './Header';

const UserDashboard = () => {
  const token = StorageService.getCurrentUserToken();
  const user = StorageService.getCurrentUser();
  if (!token && user.role !== 'trainee') return <Navigate to={'/login'} />;
  return (
    <>
      <div className='container-fluid'>
        <Header />
      </div>
      <div className='container-fluid'>
        <Content />
      </div>
    </>
  );
};

export default UserDashboard;
