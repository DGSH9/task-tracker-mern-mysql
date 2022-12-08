import React, { useEffect, useState } from 'react';
import StorageService from '../../services/storage';
import { assignedCourseRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [status, setStatus] = useState('');
  const token = StorageService.getCurrentUserToken();
  const user = StorageService.getCurrentUser();
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();
  const allStatus = [
    'none',
    'to-do',
    'in-progress',
    'on-hold',
    'ready-for-review',
  ];

  useEffect(() => {
    const token = StorageService.getCurrentUserToken();
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    allCourse();
  }, []);

  const allCourse = async () => {
    const data = await axios.get(assignedCourseRoute, { headers });
    const courseData = data.data.data.courses;
    if (data.status === 200) {
      setCourse(courseData);
    }
  };

  const updateStatus = async () => {
    if (selectedCourse) {
      const courseId = selectedCourse;
      await axios.patch(
        `${assignedCourseRoute}/${courseId}`,
        { status },
        { headers }
      );
    }
    allCourse();
  };

  const handleUpdate = (id) => {
    setSelectedCourse(id);
  };

  return (
    <div style={{ paddingTop: '70px', margin: '0 80px 100px 80px' }}>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>
        <tbody>
          {course &&
            course.map((x, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.title}</td>
                <td>{x.description}</td>
                <td>{x.status}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-toggle='modal'
                    data-target='#exampleModalCenter'
                    onClick={() => handleUpdate(x.id)}
                  >
                    Click Here to Update status
                  </button>

                  <div
                    className='modal fade'
                    id='exampleModalCenter'
                    tabIndex='-1'
                    role='dialog'
                    aria-labelledby='exampleModalCenterTitle'
                    aria-hidden='true'
                  >
                    <div
                      className='modal-dialog modal-dialog-centered'
                      role='document'
                    >
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h5
                            className='modal-title'
                            id='exampleModalLongTitle'
                          >
                            Choose status of the course
                          </h5>
                          <button
                            type='button'
                            className='close btn btn-danger'
                            data-dismiss='modal'
                            aria-label='Close'
                          >
                            <span aria-hidden='true'>X</span>
                          </button>
                        </div>
                        <div className='modal-body'>
                          {allStatus &&
                            allStatus.map((x, i) => (
                              <div key={i}>
                                <input
                                  type='radio'
                                  onChange={(e) => setStatus(e.target.value)}
                                  value={x}
                                  name='options'
                                  className=' ms-2 me-2'
                                />
                                {x}
                              </div>
                            ))}
                        </div>
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                          >
                            Close
                          </button>
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-dismiss='modal'
                            onClick={updateStatus}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
