import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyCourses } from "../services/studentService";
import { getAllActiveCourses } from "../services/courseService";
import ChangePasswordModal from "../components/ChangePasswordModal";

function StudentDashboard() {
  const [coursesToDisplay, setCoursesToDisplay] = useState([]);
  const [view, setView] = useState("browse");
  const [loading, setLoading] = useState(true);

  // 🔥 Dropdown + Modal states
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token || !email) {
      toast.warning("Please login first");
      navigate("/StudentLogin");
      return;
    }
    loadData();
  }, [view]);

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenDropdown(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const myCoursesRes = await getMyCourses(email, token);

      if (view === "myCourses") {
        if (myCoursesRes.status === "success") {
          setCoursesToDisplay(myCoursesRes.data);
        }
      } else {
        const allCoursesRes = await getAllActiveCourses();
        if (
          allCoursesRes.status === "success" &&
          myCoursesRes.status === "success"
        ) {
          const notRegistered = allCoursesRes.data.filter(
            (course) =>
              !myCoursesRes.data.some(
                (my) => my.course_id === course.course_id
              )
          );
          setCoursesToDisplay(notRegistered);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        className="sidebar d-flex flex-column p-3 text-white"
        style={{ width: "250px", backgroundColor: "#3B4953" }}
      >
        <h4 className="mb-4 text-center fw-bold">Student Portal</h4>

        <ul className="nav flex-column mb-auto">
          <li className="nav-item mb-2">
            <button
              className="nav-link text-black w-100 text-start"
              style={{
                background: view === "browse" ? "white" : "transparent",
                border: "none",
              }}
              onClick={() => setView("browse")}
            >
              Available Courses
            </button>
          </li>

          <li className="nav-item mb-2">
            <button
              className="nav-link text-black w-100 text-start"
              style={{
                background: view === "myCourses" ? "white" : "transparent",
                border: "none",
              }}
              onClick={() => setView("myCourses")}
            >
              My Enrolled Courses
            </button>
          </li>
        </ul>

        <button onClick={handleLogout} className="btn bg-white mt-4 w-100">
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* TOP HEADER */}
        <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center px-4">
          <h5 className="m-0 fw-bold">
            {view === "browse"
              ? "Available Courses (Not Registered)"
              : "My Learning Dashboard"}
          </h5>

          {/* USER DROPDOWN */}
          <div className="position-relative">
            <button
              className="btn btn-light d-flex align-items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropdown(!openDropdown);
              }}
            >
              <i className="bi bi-person-circle"></i>
              <span className="d-none d-sm-inline">{email}</span>
              <i className="bi bi-caret-down-fill"></i>
            </button>

            {openDropdown && (
              <div
                className="dropdown-menu show shadow"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%",
                  minWidth: "180px",
                  zIndex: 1000,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(false);
                    setShowChangePassword(true);
                  }}
                >
                  Change Password
                </button>

                <div className="dropdown-divider"></div>

                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          {loading ? (
            <div className="text-center mt-5">Loading...</div>
          ) : coursesToDisplay.length === 0 ? (
            <div className="alert alert-info text-center">
              {view === "browse"
                ? "You have registered for all available courses!"
                : "You haven't enrolled in any courses yet."}
            </div>
          ) : (
            <div className="row g-4">
              {coursesToDisplay.map((course) => (
                <div className="col-md-6 col-lg-4" key={course.course_id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="fw-bold">{course.course_name}</h5>
                      <p className="text-muted flex-grow-1">
                        {course.description}
                      </p>

                      {view === "browse" ? (
                        <button
                          className="btn btn-outline-dark"
                          onClick={() =>
                            navigate(`/course/${course.course_id}`)
                          }
                        >
                          View Details & Register
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            navigate(`/MyCourses/${course.course_id}`)
                          }
                        >
                          Continue Learning
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <ChangePasswordModal
        show={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  );
}

export default StudentDashboard;

