// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import "../pages/style.css";

// const SignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(`http://localhost:3002/api/login`, formData);
//       localStorage.setItem("id", result.data.id);
//       localStorage.setItem("token", result.data.token);
//       alert("Login Successful!!!");
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 400);
//     } catch (error) {
//       setErrorMessage("Login Failed");
//     }
//   };



//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//       const result = await axios.post("http://localhost:3002/api/google-login", { token: response.credential, });

//       localStorage.setItem("id", result.data.id);
//       localStorage.setItem("token", result.data.token);

//       if (result.data.newUser) {
//         // Notify the user if they are new and have received a temporary password
//         alert("Your account has been created with a temporary password. Please check your email and change it in your profile settings.");
//       } else {
//         alert("Google Login Successful!!!");
//       }

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) { setErrorMessage("Google Login Failed"); }
//   };

//   // const handleGoogleLoginSuccess = async (response) => {
//   //   try {
//   //     const result = await axios.post(`http://localhost:3002/api/google-login`, {
//   //       token: response.credential,
//   //     });

//   //     // Store user ID and token in localStorage
//   //     localStorage.setItem("id", result.data.id);
//   //     localStorage.setItem("token", result.data.token);

//   //     // Check if the user is newly created
//   //     if (result.data.newUser) {
//   //       alert("Your account has been created with a default password. Please change it in your profile settings.");
//   //     }

//   //     alert("Google Login Successful!!!");
//   //     setTimeout(() => {
//   //       navigate("/dashboard");
//   //     }, 1000);
//   //   } catch (error) {
//   //     setErrorMessage("Google Login Failed");
//   //   }
//   // };

//   return (
//     <GoogleOAuthProvider clientId="368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com">
//       <div className="auth-wrapper">
//         <div className="auth-container">
//           <h2 className="auth-title">Welcome Back!</h2>
//           <p className="auth-subtitle">Login to access your account</p>

//           <form className="auth-form" onSubmit={handleSubmit}>
//             <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
//             <button type="submit" className="small-button">Login</button>
//           </form>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}

//           {/* Google Login Button */}
//           <div className="google-login">
//             <p>or</p>
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={() => setErrorMessage("Google Login Failed")}
//             />
//           </div>

//           {/* Redirect to Register */}
//           <div className="auth-footer">
//             <h3>Don't have an account? <span className="auth-link" onClick={() => navigate("/signup")}>Register here</span></h3>
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default SignIn;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import "../pages/style.css";

// const SignIn = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(`http://localhost:3002/api/login`, formData);
//       localStorage.setItem("id", result.data.id);
//       localStorage.setItem("token", result.data.token);
//       alert("Login Successful!!!");
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 400);
//     } catch (error) {
//       setErrorMessage("Login Failed");
//     }
//   };



//   const handleGoogleLoginSuccess = async (response) => {
//     try {
//       const result = await axios.post("http://localhost:3002/api/google-login", { token: response.credential, });

//       localStorage.setItem("id", result.data.id);
//       localStorage.setItem("token", result.data.token);

//       if (result.data.newUser) {
//         // Notify the user if they are new and have received a temporary password
//         alert("Your account has been created with a temporary password. Please check your email and change it in your profile settings.");
//       } else {
//         alert("Google Login Successful!!!");
//       }

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) { setErrorMessage("Google Login Failed"); }
//   };

//   // const handleGoogleLoginSuccess = async (response) => {
//   //   try {
//   //     const result = await axios.post(`http://localhost:3002/api/google-login`, {
//   //       token: response.credential,
//   //     });

//   //     // Store user ID and token in localStorage
//   //     localStorage.setItem("id", result.data.id);
//   //     localStorage.setItem("token", result.data.token);

//   //     // Check if the user is newly created
//   //     if (result.data.newUser) {
//   //       alert("Your account has been created with a default password. Please change it in your profile settings.");
//   //     }

//   //     alert("Google Login Successful!!!");
//   //     setTimeout(() => {
//   //       navigate("/dashboard");
//   //     }, 1000);
//   //   } catch (error) {
//   //     setErrorMessage("Google Login Failed");
//   //   }
//   // };

//   return (
//     <GoogleOAuthProvider clientId="368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com">
//       <div className="auth-wrapper">
//         <div className="auth-container">
//           <h2 className="auth-title">Welcome Back!</h2>
//           <p className="auth-subtitle">Login to access your account</p>

//           <form className="auth-form" onSubmit={handleSubmit}>
//             <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
//             <button type="submit" className="small-button">Login</button>
//           </form>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}

//           {/* Google Login Button */}
//           <div className="google-login">
//             <p>or</p>
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={() => setErrorMessage("Google Login Failed")}
//             />
//           </div>

//           {/* Redirect to Register */}
//           <div className="auth-footer">
//             <h3>Don't have an account? <span className="auth-link" onClick={() => navigate("/signup")}>Register here</span></h3>
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../pages/style.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:3002/api/login`, formData);
      localStorage.setItem("id", result.data.id);
      localStorage.setItem("token", result.data.token);
      alert("Login Successful!!!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    } catch (error) {
      setErrorMessage("Login Failed");
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const result = await axios.post("http://localhost:3002/api/google-login", { token: response.credential });
      localStorage.setItem("id", result.data.id);
      localStorage.setItem("token", result.data.token);
      alert("Google Login Successful!!!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setErrorMessage("Google Login Failed");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const result = await axios.post("http://localhost:3002/api/forgot-password", { email: forgotEmail });
      if (result.data.success) {
        alert("Temporary password sent to your email");
      } else {
        setErrorMessage("Email not registered");
      }
      setIsForgotPassword(false);
    } catch (error) {
      setErrorMessage("Error sending temporary password");
    }
  };

  return (
    <GoogleOAuthProvider clientId="368841272750-bsgr39djulkqk32p6utco69sqsjj83mc.apps.googleusercontent.com">
      <div className="auth-wrapper">
        <div className="auth-container">
          <h2 className="auth-title">Welcome Back!</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
            <button type="submit" className="small-button">Login</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="google-login">
            <p>or</p>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setErrorMessage("Google Login Failed")}
            />
          </div>
          {/* Redirect to Register */}
          <div className="auth-footer">
            <h3>Don't have an account? <span className="auth-link" onClick={() => navigate("/signup")}>Register here</span></h3>
          </div>

          <p className="forgot-password-link" onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>

          {isForgotPassword && (
            <div className="forgot-password-popup">
              <h3>Forgot Password</h3>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <button onClick={handleForgotPassword}>Send</button>
              <button onClick={() => setIsForgotPassword(false)}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;