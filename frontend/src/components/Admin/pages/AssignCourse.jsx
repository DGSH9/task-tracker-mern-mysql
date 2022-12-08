import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import StorageService from '../../../services/storage';
import {
  assignCourseToUserRoute,
  courseRoute,
  userRoute,
} from '../../../utils/APIRoutes';

const AssignCourse = () => {
  const [allUser, setAllUser] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const token = StorageService.getCurrentUserToken();
  const headers = { Authorization: `Bearer ${token}` };
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };
  useEffect(() => {
    allUsers();
    allCourses();
  }, []);

  const allCourses = async () => {
    const { data } = await axios.get(userRoute, { headers });
    if (data.success === true) {
      setAllUser(data.data);
    }
  };
  const allUsers = async () => {
    const { data } = await axios.get(courseRoute, { headers });
    if (data.success === true) {
      setAllCourse(data.data);
    }
  };

  const handleAssign = async () => {
    const { data } = await axios.post(
      assignCourseToUserRoute,
      { courseId: selectedCourse, userId: selectedUser },
      { headers }
    );

    if (data.success === true) {
      toast.success(data.message, toastOptions);
    }
    if (data.success === false) {
      toast.error(data.message, toastOptions);
    }
  };

  return (
    <>
      <div className='container w-50'>
        <div style={{ marginTop: '70px' }}>
          {/* all course lsit */}
          <div>
            <h3>Please choose a course</h3>
            <select
              className='form-select shadow-none'
              aria-label='Default select example'
              onChange={handleCourseChange}
            >
              <option value='Open this select menu'>Select a course</option>
              {allCourse &&
                allCourse?.map((x, i) => (
                  <option value={x.id} key={i + 1}>
                    {x.title}
                  </option>
                ))}
            </select>
          </div>

          {/* all student list */}
          <div style={{ marginTop: '50px' }}>
            <h3>Please choose a student</h3>
            <select
              className='form-select shadow-none'
              aria-label='Default select example'
              onChange={handleUserChange}
            >
              <option value='Open this select menu'>Select a user</option>
              {allUser &&
                allUser?.map((x, i) => (
                  <option value={x.id} key={i + 1}>
                    {x.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ marginTop: '30px' }}>
            {' '}
            <button className='btn btn-primary' onClick={handleAssign}>
              Click To Assign Course
            </button>{' '}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AssignCourse;
