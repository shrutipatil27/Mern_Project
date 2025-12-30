import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../../components/AdminNavbar';
import { getAllActiveCourses } from '../../services/courseService'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const result = await getAllActiveCourses();
      if (result.status === 'success') {
        setCourses(result.data);
      } else {
        toast.error("Failed to fetch courses");
      }
    } catch (error) {
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        alert(`Delete API called for ID: ${id} (Implement deleteCourse in service first)`);
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading Courses...</div>;

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>All Courses</h2>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/admin/add-course')}
          >
            + Add Course
          </button>
        </div>

        {/* Table Section matching Page 5 of PDF */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Course Name</th>
                    <th>Fees</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Expire Days</th> */} {/* Optional based on PDF */}
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.course_id}>
                      <td>{course.course_id}</td>
                      <td className="fw-bold">{course.course_name}</td>
                      <td>₹{course.fees}</td>
                      <td>{course.start_date.split('T')[0]}</td>
                      <td>{course.end_date.split('T')[0]}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => navigate(`/admin/edit-course/${course.course_id}`)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(course.course_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center p-4 text-muted">
                        No courses found. Click "Add Course" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Courses;