import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from "../services/authService"; 

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);
      
      if (result.status === 'success') {
        // 1. Save Token AND Email (Important for fetching my-courses)
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('email', email); 
        
        toast.success("Login Successful!");
        
        // 2. Redirect to the new Dashboard instead of Home
        navigate('/student-dashboard'); 
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server connection failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card shadow">
        <h4 className="text-center mb-3">Student Login</h4>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Student Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn login-btn w-100 custom-login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default StudentLogin;