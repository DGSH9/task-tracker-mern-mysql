import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import StorageService from '../../../services/storage';
import { courseRoute } from '../../../utils/APIRoutes';

const CreateCourse = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
  });
  const token = StorageService.getCurrentUserToken();
  const headers = { Authorization: `Bearer ${token}` };
  const toastOptions = {
    position: 'top-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };
  const handleValidation = () => {
    const { title, description } = values;
    if (title === '') {
      toast.error('title is required.', toastOptions);
      return false;
    } else if (description === '') {
      toast.error('description is required.', toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { title, description } = values;
      const data = await axios.post(
        courseRoute,
        {
          title,
          description,
        },
        { headers }
      );

      if (data.status === 201) {
        toast.success(data.data.message, toastOptions);
      }
      values = '';
      if (data.status !== 201) {
        toast.error(data.data.message, toastOptions);
      }
    }
  };
  return (
    <>
      <div className='parent' style={{ margin: '120px 0px 0px 230px' }}>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div style={{ margin: '30px 5px 10px 5px' }}>
            <label for='exampleInputEmail1'>Course title</label>
          </div>
          <div class='form-group col-sm-6'>
            <input
              type='text'
              className='form-control shadow-none'
              placeholder='Enter course title'
              name='title'
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div style={{ margin: '30px 5px 10px 5px' }}>
            <label for='exampleInputPassword1'>Description</label>
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
          <div style={{ marginTop: '30px' }}>
            <button type='submit' className='btn btn-primary'>
              Create new course
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateCourse;
