import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StorageService from '../../../services/storage';
import { assignUserListFromCourseIdRoute } from '../../../utils/APIRoutes';

function ViewAllUserAssociatedToCourse() {
  const [user, setUser] = useState([]);
  // const [course, setCourse] = useState({ title: '', description: '' });
  const { courseId } = useParams();
  const token = StorageService.getCurrentUserToken();
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    retrieveAllTrainee();
  }, []);

  const retrieveAllTrainee = async () => {
    const data = await axios.get(
      `${assignUserListFromCourseIdRoute}/${courseId}`,
      {
        headers,
      }
    );
    // console.log(data);

    if (data.status == 200) {
      setUser(data.data.data.users);
      //   console.log(data.data.data.users);
      //   const { users } = data.data.data;
      // setCourse((prev) => ({
      //   ...prev,
      //   title: data.data.data.title,
      //   description: data.data.data.description,
      // }));
    }
  };

  // console.log(user);
  //   console.log(course);

  return (
    <>
      <div style={{ paddingTop: '70px', margin: '0 80px 100px 80px' }}>
        <h3>All users associated with this course</h3>
        <br />
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Sr. No.</th>
              <th scope='col'>fullName</th>
              <th scope='col'>email</th>
              <th scope='col'>status</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user?.map((x, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{x.fullName}</td>
                  <td>{x.email}</td>
                  <td>{x.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewAllUserAssociatedToCourse;
