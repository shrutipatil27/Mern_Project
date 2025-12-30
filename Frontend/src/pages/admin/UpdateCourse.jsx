import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCourseById, updateCourse } from '../../services/courseService'

const UpdateCourse = () => {
    const { courseId } = useParams() 
    const navigate = useNavigate()

    // State for all inputs
    const [courseName, setCourseName] = useState('')
    const [description, setDescription] = useState('')
    const [fees, setFees] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [videoExpireDays, setVideoExpireDays] = useState('')

    // ✅ EFFECT TO PRE-FILL DATA
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const token = sessionStorage.getItem('token')
                const result = await getCourseById(courseId, token)
                
                // Extract data (handling array or object response)
                const data = result.data && Array.isArray(result.data) ? result.data[0] : result.data;

                if (data) {
                    // Set each field into state
                    setCourseName(data.course_name || '')
                    setDescription(data.description || '')
                    setFees(data.fees || '')
                    
                    // Format dates to YYYY-MM-DD for the HTML date input
                    if (data.start_date) {
                        setStartDate(data.start_date.split('T')[0])
                    }
                    if (data.end_date) {
                        setEndDate(data.end_date.split('T')[0])
                    }
                    
                    setVideoExpireDays(data.video_expire_days || '')
                }
            } catch (error) {
                console.error("Error fetching course details:", error)
            }
        }
        fetchCourse()
    }, [courseId])

    const onUpdate = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const body = { courseName, description, fees, startDate, endDate, videoExpireDays }
            const result = await updateCourse(courseId, body, token)

            if (result.status === 'success') {
                alert('Course updated successfully!')
                navigate('/admin/courses') // Redirect to list
            } else {
                alert('Update failed')
            }
        } catch (error) {
            console.error(error)
            alert('Error updating course')
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow p-4" style={{ width: '500px', borderRadius: '10px' }}>
                <h3 className="text-center mb-4">Update Course</h3>

                <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input 
                        value={courseName} 
                        onChange={(e) => setCourseName(e.target.value)} 
                        type="text" className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        type="text" className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fees</label>
                    <input 
                        value={fees} 
                        onChange={(e) => setFees(e.target.value)} 
                        type="number" className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        type="date" className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        type="date" className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Video Expire Days</label>
                    <input 
                        value={videoExpireDays} 
                        onChange={(e) => setVideoExpireDays(e.target.value)} 
                        type="number" className="form-control" 
                    />
                </div>

                <div className="text-center mt-4">
                    <button onClick={onUpdate} className="btn btn-warning px-4 fw-bold">Update Changes</button>
                    {/* Fixed path to /admin/courses */}
                    <button onClick={() => navigate('/courses')} className="btn btn-secondary ms-2">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateCourse