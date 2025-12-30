import axios from 'axios'
import config from './config'

export async function getEnrolledStudents(courseId, token) {
  const URL = `${config.BASE_URL}/admin/enrolled-students?courseId=${courseId}`
  const headers = { token }
  const response = await axios.get(URL, { headers })
  return response.data
}