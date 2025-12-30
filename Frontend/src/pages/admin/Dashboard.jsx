import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminSidebar from '../../components/AdminSidebar'; 
import { getAllActiveCourses } from '../../services/courseService'; 

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Retrieve admin name from session, default to 'Admin' if not found
  const [adminName, setAdminName] = useState(sessionStorage.getItem('adminName') || 'Admin');
  
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const token = sessionStorage.getItem('token');
    
    // Optional: Refresh name from storage in case it changed
    const storedName = sessionStorage.getItem('adminName');
    if(storedName) setAdminName(storedName);

    if (!token) {
      toast.warning("Please login first");
      navigate('/admin/login');
      return;
    }

    try {
      const result = await getAllActiveCourses();
      if (result.status === 'success') {
        setCourses(result.data);
      } else {
        toast.error("Failed to load courses");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Dashboard...</div>;

  return (
    <div className="d-flex">
      {/* Sidebar fixed on the left */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4" style={{ marginLeft: "250px", backgroundColor: "#EBF4DD", minHeight: "100vh" }}>
        
        {/* --- HEADER SECTION --- */}
        {/* Changed 'justify-content-between' to 'justify-content-end' to keep the Welcome msg on the right */}
        <div className="d-flex justify-content-end align-items-center mb-4 border-bottom pb-3">
            
            {/* REMOVED THE "Dashboard" H2 HERE */}
            
            {/* Right Side Welcome Message */}
            <div className="d-flex align-items-center">
                <div className="text-end me-3">
                    <div className="small text-muted">Welcome back,</div>
                    <div className="fw-bold text-dark">{adminName}</div>
                </div>
                {/* Simple User Icon Circle */}
                <div className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center" style={{width: '45px', height: '45px', fontSize: '1.2rem'}}>
                    {adminName.charAt(0).toUpperCase()}
                </div>
            </div>
        </div>
        {/* -------------------------------------------------- */}
        
        <div className="row mb-4">
            <div className="col-md-4">
                <div className="card text-black bg-white mb-3 shadow-sm border-0">
                    <div className="card-header">Total Courses</div>
                    <div className="card-body">
                        <h5 className="card-title display-6">{courses.length}</h5>
                    </div>
                </div>
            </div>
        </div>

        <h4 className="mb-3 text-black">Active Courses Overview</h4>
        
        <div className="row g-4">
          {courses.length === 0 ? (
             <div className="col-12 text-center p-5 bg-white rounded shadow-sm">
                <p className="text-muted mb-0">No courses found. Go to "Courses" to add one.</p>
             </div>
          ) : (
             courses.map((course) => (
                <div key={course.course_id} className="col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0 text-center">
                    <div className="p-4 d-flex justify-content-center align-items-center bg-light" style={{height: '140px'}}>
                        <span className="display-4 text-secondary">📚</span>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark">{course.course_name}</h5>
                      <p className="card-text text-muted small">
                          Starts: {course.start_date ? course.start_date.split('T')[0] : 'N/A'}
                      </p>
                      <button 
                        className="btn btn-outline-primary w-100 btn-sm" 
                        onClick={() => navigate('/courses')}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
             ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;