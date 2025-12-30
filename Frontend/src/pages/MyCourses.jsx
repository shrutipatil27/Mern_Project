import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyCourseWithVideos } from "../services/studentService";

const MyCourses = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [expanded, setExpanded] = useState(true);

  const loadCourse = async () => {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");

  console.log("TOKEN:", token);
  console.log("EMAIL:", email);

  try {
    const result = await getMyCourseWithVideos(email, token);

    console.log("API RESULT:", result);

    if (result.status === "success") {
      const filtered = result.data.filter(
        (v) => String(v.course_id) === String(courseId)
      );

      console.log("FILTERED VIDEOS:", filtered);
      setVideos(filtered);
    }
  } catch (err) {
    console.error("API ERROR:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadCourse();
  }, [courseId]);

  if (videos.length === 0) {
    return <div className="text-center mt-5">Course not found!</div>;
  }

return (
  <div className="container mt-5" style={{ maxWidth: "900px" }}>
    <h4 className="text-center mb-4 text-secondary">
      My Registered Courses
    </h4>

    <div
      className="card shadow-sm border-0"
      style={{ borderRadius: "12px", backgroundColor: "#f9faff" }}
    >
      {/* Course Header */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{ backgroundColor: "#eef2ff" }}
      >
        <div className="d-flex align-items-center gap-2 fw-semibold">
          <i className="bi bi-bookmark-fill text-primary"></i>
          <span>{courseName}</span>
        </div>
        <i className="bi bi-chevron-up"></i>
      </div>

      {/* Course Body */}
      <div className="card-body px-4">
        <p className="text-muted small mb-3">
          <strong>Start:</strong> 10 Dec 2025 &nbsp;|&nbsp;
          <strong>End:</strong> 5 Jan 2026
        </p>

        <h6 className="text-secondary mb-3">Videos</h6>

        {videos.map((video) => (
          <div
            key={video.video_id}
            className="d-flex justify-content-between align-items-center p-3 mb-3 border rounded"
            style={{
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onClick={() => window.open(video.youtube_url, "_blank")}
          >
            <div>
              <div className="fw-semibold text-primary">
                {video.title}
              </div>
              <div className="text-muted small">
                Added: {new Date(video.added_at).toLocaleDateString()}
              </div>
            </div>
            <i className="bi bi-chevron-right text-muted"></i>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};
 export default MyCourses;

