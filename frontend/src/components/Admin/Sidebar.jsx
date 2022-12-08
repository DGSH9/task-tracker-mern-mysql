import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate('/admin');
  };
  return (
    <>
      <div className='wrapper bg-secondary' style={{ minHeight: '100vh' }}>
        <nav id='sidebar'>
          <div
            className='sidebar-header p-3 mb-2 text-white'
            style={{ marginLeft: '40px 0px 0px 30px' }}
          >
            <a
              src={Logo}
              style={{ cursor: 'pointer' }}
              onClick={handleClickHome}
              height='50'
              width='50'
            >
              Task Tracker
            </a>
          </div>
          <div style={{ marginTop: '30px' }}>
            <ul className='list-unstyled components'>
              <hr />
              <li>
                <div style={{ margin: '20px 0px 0px 60px' }}>
                  <Link
                    className='text-white text-decoration-none'
                    to='/admin/dashboard/trainee'
                  >
                    Trainees
                  </Link>
                </div>
              </li>
              <li className='chover'>
                <hr />
                <div className='accordion-item my-3'>
                  <h2
                    className='accordion-header text-white'
                    id='flush-headingOne'
                    style={{ paddingLeft: '60px' }}
                  >
                    <button
                      className='accordion-button collapsed shadow-none Accord border-none me-1'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseOne'
                      aria-expanded='false'
                      aria-controls='flush-collapseOne'
                    >
                      Courses
                    </button>
                  </h2>

                  <div
                    id='flush-collapseOne'
                    className='accordion-collapse collapse text-white'
                    aria-labelledby='flush-headingOne'
                    data-bs-parent='#flush-headingOne'
                    style={{ marginTop: '20px' }}
                  >
                    <div
                      className='accordion-body'
                      style={{ margin: '20px 0px 0px 60px' }}
                    >
                      <Link
                        className='text-white text-decoration-none'
                        to='/admin/dashboard/courses'
                      >
                        View all course
                      </Link>
                    </div>
                    <div
                      className='accordion-body'
                      style={{ margin: '20px 0px 0px 60px' }}
                    >
                      <Link
                        className='text-white text-decoration-none'
                        to='/admin/dashboard/create/course'
                      >
                        Create course
                      </Link>
                    </div>
                  </div>
                </div>
                <hr></hr>
              </li>
              <li>
                <div style={{ margin: '20px 0px 0px 60px' }}>
                  <Link
                    className='text-white text-decoration-none'
                    to='/admin/dashboard/assign/course'
                  >
                    Assign Courses
                  </Link>
                </div>
              </li>
              <hr />
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
