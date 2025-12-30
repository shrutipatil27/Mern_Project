
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllActiveCourses } from "../services/courseService"; // Using your file

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const result = await getAllActiveCourses();

      if (result.status === 'success') {
        // Find the specific course where course_id matches the URL id
        const foundCourse = result.data.find((c) => c.course_id == id);
        setCourse(foundCourse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!course) {
    return <div className="text-center mt-5"><h3>Loading details...</h3></div>;
  }

  // Map Backend Data to UI Variables
  const title = course.course_name;
  const description = course.description;
  // Fix Date format (remove the time part)
  const startDate = course.start_date ? course.start_date.split('T')[0] : 'N/A';
  const endDate = course.end_date ? course.end_date.split('T')[0] : 'N/A';
  const fees = `₹${course.fees}`;

  // Create a placeholder image using the course title
  const imgUrl = "https://via.placeholder.com/300x180?text=" + title.replace(/ /g, '+');

  // Hardcoded topics (since DB doesn't have them yet)
  const topics = [
    "Comprehensive curriculum coverage",
    "Hands-on projects",
    "Expert mentorship",
    "Certification included"
  ];

  return (
    <div className="main-content">
      <div className="course-heading mb-4">
        <h2 className="fw-bold mb-0 text-dark">{title}</h2>
      </div>

      <div className="card border-0 shadow-sm p-4 bg-white course-card" style={{ borderRadius: "15px" }}>
        <div className="row align-items-center mb-5">
          <div className="col-md-5">
            {/* <div className="bg-light rounded-4 d-flex align-items-center justify-content-center p-4 border" style={{ minHeight: "220px" }}>
              <img
                src={`/course-logos/DS_AI.png${course.course_id}.png`}
                alt="course logo"
                className="img-fluid rounded"
                onError={(e) => {
                  e.target.src = "/course-logos/default.png";
                }}
              />

            </div> */}
            <div
              className="bg-light rounded-4 border"
              style={{
                height: "220px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={`/public/default.png`}
                alt={course.course_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",   // fills container nicely
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/course-logos/default.png";
                }}
              />
            </div>

          </div>

          <div className="col-md-7 ps-md-5 mt-4 mt-md-0">
            <h3 className="fw-bold mb-1">{title}</h3>
            <p className="text-muted mb-4">{description}</p>

            <div className="mb-2"><strong>Start Date:</strong> {startDate}</div>
            <div className="mb-2"><strong>End Date:</strong> {endDate}</div>
            <div className="mb-4"><strong>Fees:</strong> {fees}</div>

            <button
              className="btn btn-success px-5 py-2 fw-bold"
              style={{ backgroundColor: "#2d6a4f", border: "none" }}
              onClick={() => navigate(`/register/${course.course_id}`)}
            >
              Register to Course
            </button>
          </div>
        </div>

        <div className="mt-2">
          <h5 className="fw-bold mb-3 text-dark">Topics include:</h5>
          <ul className="list-unstyled">
            {topics.map((topic, index) => (
              <li key={index} className="mb-2"> • {topic}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-link text-decoration-none text-muted p-0" onClick={() => navigate(-1)}>
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;