// src/pages/admin/AdminLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
  const navigate = useNavigate()

  const onLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="d-flex">
      {/* --- SIDEBAR (Fixed Left) --- */}
      {/* Keep your existing sidebar colors/classes here */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
        <h3 className="mb-4 text-center">Admin Panel</h3>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link to="/admin/Dashboard" className="nav-link text-white">
               Dashboard
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/admin/courses" className="nav-link text-white">
               Manage Courses
            </Link>
          </li>
          {/* Add other links (Students, Videos) here */}
          
          <li className="nav-item mt-5">
            <button onClick={onLogout} className="btn btn-danger w-100">Logout</button>
          </li>
        </ul>
      </div>

      {/* --- CONTENT AREA (Right Side) --- */}
      <div className="flex-grow-1 p-4 bg-light">
         {/* This is where Dashboard OR Course Table will appear */}
         <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout