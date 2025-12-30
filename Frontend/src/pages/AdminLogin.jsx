
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Professional notifications
import { jwtDecode } from "jwt-decode"; // To read the role from the token
import { loginUser } from "../services/authService"; // Your API service

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 1. Basic validation
    if (email.length === 0 || password.length === 0) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      // 2. Call the backend API
      const result = await loginUser(email, password);
      
      if (result.status === 'success') {
        const { token } = result.data;
        
        // 3. Decode the token to check the Role
        const decoded = jwtDecode(token);
        
        if (decoded.role === 'ADMIN') {
          // 4. Success: Save token & Redirect to Admin Dashboard
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('role', 'ADMIN');
          
          toast.success("Welcome, Admin!");
          navigate('/dashboard'); // Ensure you have this route created
        } else {
          // 5. Fail: User exists but is NOT an Admin
          toast.error("Access Denied: You are not an Admin.");
        }

      } else {
        // Backend returned an error (e.g., "Invalid email or password")
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card shadow">
        <h4 className="text-center mb-3">Admin Login</h4>

        <div className="mb-3">
          
          <input
            type="email"
            className="form-control"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn login-btn w-100 " onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; 
// // import { jwtDecode } from "jwt-decode"; // Uncomment if using real decoding
// // import { loginUser } from "../services/authService"; // Uncomment if using real API

// function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     // 1. Validation
//     if (email.length === 0 || password.length === 0) {
//       toast.warning("Please enter email and password");
//       return;
//     }

//     try {
//        // --- TEMPORARY TESTING BLOCK (Remove this when API is ready) ---
//        if(email === "admin@gmail.com" && password === "admin") {
//            sessionStorage.setItem('token', 'fake-jwt-token');
//            sessionStorage.setItem('role', 'ADMIN');
//            toast.success("Welcome, Admin!");
           
//            // THIS IS THE CRITICAL LINE:
//            navigate('/admin/dashboard'); 
//            return;
//        }
//        // -------------------------------------------------------------

//       /* // REAL API LOGIC (Uncomment when ready)
//       const result = await loginUser(email, password);
//       if (result.status === 'success') {
//         const { token } = result.data;
//         // Check role logic here...
//         navigate('/admin/dashboard'); 
//       } 
//       */
      
//       toast.error("Invalid Credentials");

//     } catch (error) {
//       console.error(error);
//       toast.error("Login failed.");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow" style={{ width: "350px" }}>
//         <h4 className="text-center mb-3">Admin Login</h4>
//         <div className="mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="admin@gmail.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
        
//         {/* The onClick fires the handleLogin function above */}
//         <button className="btn btn-dark w-100" onClick={handleLogin}>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;