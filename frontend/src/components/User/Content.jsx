import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import StorageService from '../../services/storage';
const Content = () => {
  const token = StorageService.getCurrentUserToken();
  const user = StorageService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && user.role !== 'trainee') {
      navigate('/login');
    }
  }, []);

  return <Outlet />;
};

export default Content;
