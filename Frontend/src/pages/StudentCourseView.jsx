
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCourseVideos } from "../services/videoService";
import { getAllVideos } from "../services/videoService";

function StudentCourseView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPageData();
  }, [courseId]);

  const loadPageData = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        toast.warning("Please login first");
        navigate('/StudentLogin');
        return;
    }

    try {
      // 1. Fetch Course Info
      const courseRes = await getAllActiveCourses();
      if (courseRes.status === 'success') {
        const foundCourse = courseRes.data.find(c => c.course_id == courseId);
        setCourse(foundCourse);
      }

      // 2. Fetch Videos
      const videoRes = await getAllVideos(courseId, token);
      if (videoRes.status === 'success') {
        setVideos(videoRes.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading content");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (url) => {
    // Open the video link in a new tab
    if(url) {
        window.open(url, '_blank');
    } else {
        toast.info("No link available for this video");
    }
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  if (!course) return <div className="p-5 text-center">Course not found.</div>;

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#F5F7FA", paddingBottom: "50px" }}>
      
      {/* --- Top Navbar (Simple version for this page) --- */}
      <div className="bg-white shadow-sm p-3 mb-5 d-flex justify-content-between align-items-center px-4">
        <div className="d-flex align-items-center">
             <img src="https://via.placeholder.com/100x30?text=SUNBEAM" alt="Logo" style={{height: "30px", marginRight: "15px"}}/>
        </div>
        <div>
             <button onClick={() => navigate('/student-dashboard')} className="btn btn-outline-secondary btn-sm">
                &larr; Back to Dashboard
             </button>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="container" style={{ maxWidth: "900px" }}>
        
        <h3 className="text-center text-secondary mb-4" style={{ fontWeight: "400" }}>
            My Registered Courses
        </h3>

        {/* --- The Course Card --- */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
            
            {/* 1. BLUE HEADER */}
            <div className="card-header border-0 p-3 d-flex justify-content-between align-items-center" 
                 style={{ backgroundColor: "#E6EFFC", borderBottom: "1px solid #dae7f7" }}>
                
                <div className="d-flex align-items-center gap-2">
                    {/* Bookmark Icon */}
                    <span style={{ color: "#2563EB", fontSize: "1.2rem" }}>
                        <i className="bi bi-bookmark-fill"></i> {/* Requires Bootstrap Icons, or use text */}
                        🔖
                    </span>
                    <h5 className="mb-0 fw-bold" style={{ color: "#334155" }}>
                        {course.course_name} <span className="text-muted" style={{fontWeight: "normal"}}></span>
                    </h5>
                </div>
                
                {/* Arrow Icon */}
                <span className="text-muted">^</span> 
            </div>

            {/* 2. COURSE INFO (Dates) */}
            <div className="bg-white p-3 border-bottom">
                <p className="mb-0 text-dark fw-bold" style={{ fontSize: "0.9rem" }}>
                    Start: <span className="fw-normal">{course.start_date.split('T')[0]}</span> 
                    <span className="mx-2 text-muted">|</span> 
                    End: <span className="fw-normal">{course.end_date.split('T')[0]}</span>
                </p>
            </div>

            {/* 3. VIDEOS LIST SECTION */}
            <div className="p-4 bg-light bg-opacity-10">
                <h5 className="mb-3 text-secondary">Videos</h5>

                {videos.length === 0 ? (
                    <p className="text-muted">No videos uploaded yet.</p>
                ) : (
                    <div className="d-flex flex-column gap-2">
                        {videos.map((vid) => (
                            <div 
                                key={vid.video_id} 
                                className="bg-white border rounded p-3 d-flex justify-content-between align-items-center shadow-sm video-row"
                                style={{ cursor: "pointer", transition: "0.2s" }}
                                onClick={() => handleVideoClick(vid.youtube_url)}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f8f9fa"}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
                            >
                                <div>
                                    <h6 className="mb-1 fw-bold" style={{ color: "#2563EB" }}>
                                        {vid.title}
                                    </h6>
                                    <small className="text-muted">
                                        Added: {vid.added_at ? vid.added_at.split('T')[0] : 'Recently'}
                                    </small>
                                </div>
                                <div className="text-muted">
                                    &gt; {/* Right Arrow symbol */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>

        {/* Extra Description (Optional, outside the card) */}
        <div className="mt-4 text-center">
            <p className="text-muted small">Click on a video row to open the link.</p>
        </div>

      </div>
    </div>
  );
}

export default StudentCourseView;