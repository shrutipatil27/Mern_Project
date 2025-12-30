import axios from 'axios'
import config from './config'

// STUDENT SERVICES

export async function registerToCourse(courseId, name, email, mobileNo) {
  const URL = config.BASE_URL + '/student/register-to-course'
  const body = { courseId, name, email, mobileNo }
  
  // This route is Public in your auth.js, so no token needed
  const response = await axios.post(URL, body)
  return response.data
}

export async function getMyCourses(email, token) {
  // Pass email as query param: ?email=value
  const URL = `${config.BASE_URL}/student/my-courses?email=${email}`
  const headers = { token } 
  const response = await axios.get(URL, { headers })
  return response.data
}

export async function getMyCourseWithVideos(email, token) {
  const URL = `${config.BASE_URL}/student/my-course-with-videos?email=${email}`
  const headers = { token }
  const response = await axios.get(URL, { headers })
  return response.data
}

export async function changePassword(newPassword, confirmPassword, token) {
  const URL = config.BASE_URL + '/student/change-password'
  const body = { newPassword, confirmPassword }
  const headers = { token } // Backend needs token to identify user
  const response = await axios.put(URL, body, { headers })
  return response.data
}


// ALL ENROLLED STUDENTS (ADMIN)
export async function getAllEnrolledStudents(token) {
  const URL = `${config.BASE_URL}/student/enrolled/all`;
  const res = await axios.get(URL, {
    headers: { token }
  });
  return res.data;
}

// ENROLLED STUDENTS BY COURSE (ADMIN)
export async function getEnrolledStudents(courseId, token) {
  const URL = `${config.BASE_URL}/student/enrolled/${courseId}`;
  const res = await axios.get(URL, {
    headers: { token }
  });
  return res.data;
}