import React, { useEffect, useState } from 'react';
import StorageService from '../../../services/storage';
import { courseRoute } from '../../../utils/APIRoutes';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ViewCourse = () => {
  const navigate = useNavigate();

  const [allCourse, setAllCourse] = useState([]);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });
  const [selectedCourse, setSelectedCourse] = useState('');
  const token = StorageService.getCurrentUserToken();
  const headers = { Authorization: `Bearer ${token}` };

  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  useEffect(() => {
    allCourses();
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const allCourses = async () => {
    const { data } = await axios.get(courseRoute, { headers });
    if (data.success === true) {
      setAllCourse(data.data);
    }
  };
  const handleClick = (id) => {
    setSelectedCourse(id);
  };
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`${courseRoute}/${id}`, { headers });
    if (data.success === true) {
      toast.success(data.message, toastOptions);
    }
    allCourses();
  };
  const handleView = async (id) => {
    navigate(`/admin/dashboard/assign/course/by-course-id/${id}`);
    // toast.warning('need to update', toastOptions);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const { title, description } = values;
    const courseId = selectedCourse;
    const data = await axios.put(
      `${courseRoute}/${courseId}`,
      {
        title,
        description,
      },
      { headers }
    );

    if (data.status === 200) {
      toast.success(data.data.message, toastOptions);
    }

    if (data.status !== 200) {
      toast.error(data.data.message, toastOptions);
    }
    allCourses();
  };
  return (
    <div style={{ paddingTop: '70px', margin: '0 80px 100px 80px' }}>
      <h3>All courses</h3>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Sr. No.</th>
            <th scope='col'>title</th>
            <th scope='col'>description</th>
            <th scope='col' style={{ textAlign: 'center' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allCourse &&
            allCourse?.map((x, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{x.title}</td>
                <td>{x.description}</td>
                <td style={{ textAlign: 'center' }}>
                  <div className='d-inline '>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => handleView(x.id)}
                    >
                      View All user Associated to this Course
                    </button>
                  </div>
                  <div className='ms-2 d-inline '>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-toggle='modal'
                      data-target='#exampleModalCenter'
                      onClick={() => handleClick(x.id)}
                    >
                      Update
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
                              Update course
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
                            <div className='parent'>
                              <form>
                                <div className='mb-2'>
                                  <label
                                    style={{ marginLeft: '-380px' }}
                                    htmlFor='exampleInputEmail1'
                                  >
                                    Course title
                                  </label>
                                </div>
                                <div className='form-group col-sm-6'>
                                  <input
                                    type='text'
                                    className='form-control shadow-none'
                                    placeholder='Enter course title'
                                    name='title'
                                    onChange={(e) => handleChange(e)}
                                  />
                                </div>
                                <div className='mb-2'>
                                  <label
                                    style={{ marginLeft: '-380px' }}
                                    htmlFor='exampleInputPassword1'
                                  >
                                    Description
                                  </label>
                                </div>
                                <div className='form-group col-sm-6'>
                                  <input
                                    type='text'
                                    className='form-control shadow-none'
                                    name='description'
                                    placeholder='Enter course Description'
                                    onChange={(e) => handleChange(e)}
                                  />
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
                                    onClick={(event) => handleUpdate(event)}
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='ms-2 d-inline '>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => handleDelete(x.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ViewCourse;
