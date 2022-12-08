import React, { useEffect, useState } from 'react';
import StorageService from '../../../services/storage';
import { courseRoute, userRoute } from '../../../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Trainee = () => {
  const [allUser, setAllUser] = useState([]);
  const token = StorageService.getCurrentUserToken();
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

  useEffect(() => {
    const token = StorageService.getCurrentUserToken();
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    allUsers();
  }, []);

  const allUsers = async () => {
    const { data } = await axios.get(userRoute, { headers });
    if (data.success === true) {
      setAllUser(data.data);
    }
  };
  return (
    <div style={{ paddingTop: '70px', margin: '0 80px 100px 80px' }}>
      <h3>All users</h3>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Sr. No.</th>
            <th scope='col'>fullName</th>
            <th scope='col'>email</th>
          </tr>
        </thead>
        <tbody>
          {allUser &&
            allUser?.map((x, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.fullName}</td>
                <td>{x.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trainee;
