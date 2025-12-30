import { useEffect, useState } from 'react'
import {
  getAllEnrolledStudents,
  getEnrolledStudents
} from '../../services/studentService'
import { toast } from 'react-toastify'

const AdminStudents = () => {
  const [students, setStudents] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('All')

  const courseOptions = [1, 2, 4, 7]
  const token = sessionStorage.getItem('token')

  const loadStudents = async (courseId) => {
    if (!token) {
      toast.error("Admin not logged in")
      return
    }

    try {
      let response

      if (courseId === 'All') {
        response = await getAllEnrolledStudents(token)
      } else {
        response = await getEnrolledStudents(courseId, token)
      }

      if (response?.status === "success") {
        setStudents(response.data)
      } else if (Array.isArray(response)) {
        setStudents(response)
      } else {
        setStudents([])
      }

    } catch (err) {
      console.error(err)
      toast.error("Failed to load students")
      setStudents([])
    }
  }

  // initial load
  useEffect(() => {
    loadStudents('All')
  }, [])

  const handleFilterChange = (e) => {
    const value = e.target.value
    setSelectedCourse(value)
    loadStudents(value)
  }

  return (
    <div className="container-fluid mt-4 px-4">
      <h2 className="text-center mb-4 fw-bold">Student Directory</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="fw-bold me-2">Filter by Course:</label>
        <select
          className="form-select w-auto d-inline-block shadow-sm"
          value={selectedCourse}
          onChange={handleFilterChange}
        >
          <option value="All">All Courses</option>
          {courseOptions.map(id => (
            <option key={id} value={id}>Course ID: {id}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="table-responsive bg-white shadow-sm rounded">
        <table className="table table-hover table-bordered text-center align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Reg No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course ID</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map(s => (
                <tr key={s.reg_no}>
                  <td className="fw-bold">{s.reg_no}</td>
                  <td>{s.name || "N/A"}</td>
                  <td>{s.email}</td>
                  <td>
                    <span className="badge bg-primary">
                      ID: {s.course_id}
                    </span>
                  </td>
                  <td>{s.mobile_no}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-5 text-muted">
                  No students found for this selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminStudents
