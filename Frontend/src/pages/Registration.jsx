import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import Toast
import { getAllActiveCourses } from "../services/courseService"; // To show course info
import { registerToCourse } from "../services/studentService"; // To submit form

function Registration() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // 1. Load the Course Details when page opens
  useEffect(() => {
    fetchCourseInfo();
  }, [id]);

  const fetchCourseInfo = async () => {
    try {
      // Since we don't have a 'getById' API, we fetch all and find the one we need
      const result = await getAllActiveCourses();
      if (result.status === 'success') {
        const course = result.data.find(c => c.course_id == id);
        if (course) {
          setSelectedCourse(course);
        } else {
          toast.error("Course not found");
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if(!formData.fullName || !formData.email || !formData.phone) {
        toast.warning("Please fill all fields");
        return;
    }

    try {
      // Call the backend API
      const result = await registerToCourse(
        id, 
        formData.fullName, 
        formData.email, 
        formData.phone
      );

      if (result.status === 'success') {
        toast.success(`Successfully enrolled in ${selectedCourse.course_name}!`);
        navigate("/"); // Redirect to Home
      } else {
        toast.error("Registration failed: " + JSON.stringify(result.error));
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!selectedCourse) return null;

  return (
    <div className="registration_page d-flex flex-column align-items-center py-5">
        
        {/* --- 1. Top Card: Course Summary Table --- */}
        <div className="card border-0 shadow-sm p-4 bg-white mb-4" style={{ borderRadius: "15px", width: "100%", maxWidth: "600px" }}>
            <div className="table-responsive">
                <table className="table table-bordered align-middle m-0">
                <thead className="table-light">
                    <tr>
                    <th className="fw-bold text-dark">Course Name</th>
                    <th className="fw-bold text-center text-dark">Fees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {/* Dynamic Data from MySQL */}
                    <td className="">{selectedCourse.course_name}</td>
                    <td className="text-center fw-bold">₹{selectedCourse.fees}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        
        {/* --- 2. Bottom Card: Registration Form --- */}
        <div className="card border-0 shadow-sm p-4 bg-white" style={{ borderRadius: "15px", width: "100%", maxWidth: "600px" }}>
            <div className="course-heading mb-4">
                <h3 className="fw-bold text-dark text-center pe-5">Register to Course</h3>
            </div>

            <form onSubmit={handleSubmit} className="text-start">
                <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your name"
                    required 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                </div>

                <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="name@example.com"
                    required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                </div>

                <div className="mb-4">
                <label className="form-label fw-bold">Phone Number</label>
                <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="+91 XXXXX XXXXX"
                    required 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                </div>

                <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success px-4 fw-bold" style={{ backgroundColor: "#2d6a4f", border: "none" }}>
                    Confirm Registration
                </button>
                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate(-1)}>
                    Cancel
                </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Registration;