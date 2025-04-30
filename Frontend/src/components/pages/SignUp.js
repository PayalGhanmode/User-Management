import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { registerUser } from "../../api";
import "../pages/style.css";
import validateUser from "../../utils/Validate";

const SignUp = () => {
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstname: "",
    lastname:"",
    email:"",
    gender:"",
    maritialstatus: false,
    profile: null,
    password: "",
    dob:""
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {  
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    const validationErrors = validateUser(formData);
    if (Object.keys(validationErrors).length === 0) {
        console.log('Form data submitted:', formData);
        // Perform form submission or API call here
    } else {
        setErrors(validationErrors);
    }
    try {
      const result = await registerUser(form); 
      console.log("Registration Success:", result);
      alert("Registration Successful!!!");
      navigate("/"); 
    } catch (error) {
      console.error("Registration Error:", error.message);
      console.log("---------------------")
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2 className="auth-title">Create Your Account</h2>
        <h2 className="auth-subtitle">Hey User!! Let's Start Exploring..</h2>
        <div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="firstname" placeholder="Enter First Name" onChange={handleChange}  />
          {errors.firstname && <p className="error">{errors.firstname}</p>}

          <input type="text" name="lastname" placeholder="Enter Last Name" onChange={handleChange}  />
          {errors.lastname && <p className="error">{errors.lastname}</p>}

          <input type="text" name="email" placeholder="Enter Email" onChange={handleChange}  />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="password" name="password" placeholder="Enter password" onChange={handleChange}  />
          {errors.password && <p className="error">{errors.password}</p>}

          <input type="file" name="profile" onChange={handleChange} />
          {errors.profile && <p className="error">{errors.profile}</p>}

          <div className="gender-container">
            <label className="gender-label">Married:</label>
            <div className="gender-options">
              <input type="checkbox" name="maritialstatus" onChange={handleChange} />
              {errors.maritialstatus && <p className="error">{errors.maritialstatus}</p>}

            </div>
          </div>
          <input type="date" name="dob"  onChange={handleChange}  />
          {errors.dob && <p className="error">{errors.dob}</p>}


          <div className="gender-container">
            <label className="gender-label">Gender:</label>
            <div className="gender-options">
              <label><input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange}  />Male</label>
              <label><input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange}  />Female</label>
              {errors.gender && <p className="error">{errors.gender}</p>}

            </div>
          </div>
          <button type="submit" className="small-button">Register</button>
        </form>
    </div>
        <div className="auth-footer">
          <h3>Already have an account? <span className="auth-link" onClick={() => navigate("/")}>Sign in here</span></h3>
        </div>
      </div>
    </div>
  );
};

export default SignUp;