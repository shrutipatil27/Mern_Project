import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllActiveCourses } from "../services/courseService"; // Import your specific file

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      // 1. Call your service function
      const result = await getAllActiveCourses();
      
      // 2. Check if the backend said "success"
      if (result.status === 'success') {
        setCourses(result.data); // 'data' is the array from MySQL
      } else {
        console.error("Error from server:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="container-fluid px-4 py-5">
      <div className="active-courses-container p-4 mb-5 shadow-sm rounded">
        <h2 className="mb-4" style={{ paddingTop: "10px" }}>Active Courses</h2>

        <div className="row g-4">
          {courses.map(course => (
            // Use 'course_id' because that's what your database sends
            <div className="col-md-4 mb-4" key={course.course_id}> 
              <div className="card h-100 shadow-sm custom-card rectangular-card">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    {/* Database field: course_name */}
                    <h5 className="card-title fw-bold">{course.course_name}</h5>
                    
                    {/* Database field: description */}
                    <p className="card-text text-muted">
                      {course.description.length > 50 
                        ? course.description.substring(0, 50) + "..." 
                        : course.description}
                    </p>
                    
                    {/* Database field: fees */}
                    <p className="fw-bold mt-2">₹{course.fees}</p>
                  </div>
                  
                  {/* Link uses course_id */}
                  <Link to={`/course/${course.course_id}`} className="btn btn-outline-dark btn-sm mt-2 view-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

