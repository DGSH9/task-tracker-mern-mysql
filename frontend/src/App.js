import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './components/Admin/AdminDashboard'
import UserDashboard from "./components/User/UserDashboard"
import Home from "./components/User/Home";
import Course from "./components/User/Course";
import Index from './pages/Index'
import Trainee from "./components/Admin/pages/Trainee"
import ViewCourse from "./components/Admin/pages/ViewCourse"
import CreateCourse from "./components/Admin/pages/CreateCourse";
import AssignCourse from "./components/Admin/pages/AssignCourse";
import ViewAllUserAssociatedToCourse from './components/Admin/pages/ViewAllUserAssociatedToCourse';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login register */}
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path='/admin' element={< AdminDashboard />}>
            <Route path="/admin/dashboard/trainee" element={<Trainee />} />
            <Route path="/admin/dashboard/courses" element={<ViewCourse />} />
            <Route path="/admin/dashboard/create/course" element={<CreateCourse />} />
            <Route path="/admin/dashboard/assign/course" element={<AssignCourse />} />
            <Route path="/admin/dashboard/assign/course/by-course-id/:courseId" element={<ViewAllUserAssociatedToCourse />} />
          </Route>



          {/* Student */}
          <Route path='/' element={<UserDashboard />} >
            <Route path="/trainee/home" element={<Home />} />
            <Route path="/trainee/course" element={<Course />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
