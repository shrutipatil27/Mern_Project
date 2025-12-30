import axios from 'axios'
import config from './config'

// COURSE SERVICES

export async function getAllActiveCourses() {
  const URL = config.BASE_URL + '/course/all-active-courses'
  // Public route, no token needed
  const response = await axios.get(URL)
  return response.data
}

// ADMIN ONLY
export async function addCourse(courseData, token) {
  const URL = config.BASE_URL + '/course/add'
  const headers = { token }
  // courseData should be object: { courseName, description, fees, startDate, endDate, videoExpireDays }
  const response = await axios.post(URL, courseData, { headers })
  return response.data
}

// ADMIN ONLY
export async function deleteCourse(courseId, token) {
  const URL = `${config.BASE_URL}/course/delete/${courseId}`
  const headers = { token }
  const response = await axios.delete(URL, { headers })
  return response.data
}

// ADMIN ONLY
export async function updateCourse(courseId, courseData, token) {
  const URL = `${config.BASE_URL}/course/update/${courseId}`
  const headers = { token }
  // courseData: { courseName, description, fees, startDate, endDate, videoExpireDays }
  const response = await axios.put(URL, courseData, { headers })
  return response.data
}

export async function getAllCoursesAdmin(token) {
  // Assuming the router is mounted at /course based on previous examples
  const URL = `${config.BASE_URL}/course/all-courses-admin`
  const headers = { token }
  
  // No body data needed for a GET request, just the headers
  const response = await axios.get(URL, { headers })
  return response.data
}
export async function getCourseById(id, token) {
  const URL = `${config.BASE_URL}/course/${id}` // Matches your backend GET /course/:id
  const headers = { token }
  const response = await axios.get(URL, { headers })
  return response.data
}