import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path ? 'active bg-primary text-white' : 'text-dark';

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#3B4953",
        color: "white"
      }}
    >
  
      <Link to="/admin/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">Admin Portal</span>
      </Link>
      <hr className="bg-white" /> 

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">

          <Link
            to="/dashboard"
            className={`nav-link ${isActive('/admin/dashboard')}`}
            style={{ color: isActive('/admin/dashboard') ? 'white' : '#adb5bd' }}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/courses"
            className={`nav-link ${isActive('/admin/courses')}`}
            style={{ color: isActive('/courses') ? 'white' : '#adb5bd' }}
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            to="/AdminVideos"
            className={`nav-link ${isActive('/Adminvideos')}`}
            style={{ color: isActive('/AdminVideos') ? 'white' : '#adb5bd' }}
          >
            Videos
          </Link>
        </li>
        <li>
          <Link
            to="/AdminStudent"
            className={`nav-link ${isActive('/AdminStudent')}`}
            style={{ color: isActive('/AdminStudent') ? 'white' : '#adb5bd' }}
          >
            Students
          </Link>
        </li>
      </ul>

      <hr className="bg-white" />
      <div className="dropdown">
        <button className="btn bg-white w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>


    );
};

export default AdminSidebar;