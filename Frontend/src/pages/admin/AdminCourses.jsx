import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCoursesAdmin, deleteCourse } from '../../services/courseService'

const AdminCourses = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const loadCourses = async () => {
        const token = sessionStorage.getItem('token')
        if (!token) return

        try {
            const result = await getAllCoursesAdmin(token)
            // Handle response wrapper
            if (result && result['data']) {
                setCourses(result['data'])
            } else {
                setCourses(result)
            }
        } catch (error) {
            console.error("API ERROR:", error)
        }
    }

    const onDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const token = sessionStorage.getItem('token')
            await deleteCourse(id, token)
            // Remove from UI instantly
            setCourses(courses.filter(c => c.course_id !== id))
        }
    }

    // Navigate to Add Page
    const goToAdd = () => {
        navigate('/admin/AddCourse')
    }

    // Navigate to Update Page (passing the ID)
    const goToUpdate = (id) => {
        navigate(`/UpdateCourse/${id}`)
    }

    // This function runs when you click the button in the top right
    const onAddCourse = () => {
        navigate('/AddCourse') // This must match the Route path above
    }
    useEffect(() => {
        loadCourses()
    }, [])

    return (
        <div className="container-fluid">
            {/* --- HEADER ROW --- */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>All Courses</h2>

                {/* BUTTON IN TOP RIGHT CORNER */}
                <button onClick={onAddCourse} className="btn btn-primary">
                    + Add New Course
                </button>
            </div>

            {/* --- TABLE --- */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Course Name</th>
                            <th>Description</th>
                            <th>Fees</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.course_id}>
                                <td>{course.course_id}</td>
                                <td>{course.course_name}</td>
                                <td>{course.description}</td>
                                <td>{course.fees}</td>
                                <td>{new Date(course.start_date).toLocaleDateString()}</td>
                                <td>{new Date(course.end_date).toLocaleDateString()}</td>
                                <td>
                                    {/* UPDATE BUTTON */}
                                    <button
                                        onClick={() => goToUpdate(course.course_id)}
                                        className="btn btn-warning btn-sm me-2">
                                        Update
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button
                                        onClick={() => onDelete(course.course_id)}
                                        className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminCourses;