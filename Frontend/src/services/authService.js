import axios from 'axios'
import config from './config'

// AUTHENTICATION SERVICES

export async function loginUser(email, password) {
  const URL = config.BASE_URL + '/auth/login'
  const body = { email, password }
  const response = await axios.post(URL, body)
  return response.data
}

// Change Password API
export async function changePassword(email, newPassword, confirmPassword) {
  const token = sessionStorage.getItem("token")

  console.log("TOKEN SENT:", token) // 🔥 DEBUG

  const response = await axios.put(
    config.BASE_URL + "/student/change-password",
    { newPassword, confirmPassword },
    {
      headers: {
        token: token
      }
    }
  )

  return response.data
}