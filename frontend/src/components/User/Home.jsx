import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/trainee/course');
  };
  return (
    <div className='container' style={{ paddingTop: '100px' }}>
      <div class='card'>
        <div class='card-header'>Course List</div>
        <div class='card-body'>
          <button onClick={handleClick} className='btn btn-primary'>
            You have to complete These Courses Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
