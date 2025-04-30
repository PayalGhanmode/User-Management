import React, { useState, useEffect } from "react";
import './UserProfileModal.css';
import { changePassword } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfileModal = ({ userData, setUserData, show, onClose }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstname: userData?.firstname || "",
    lastname: userData?.lastname || "",
    email: userData?.email || "",
    gender: userData?.gender || "",
    maritialstatus: userData?.maritialstatus,
    profile: userData?.profile || "",
  });
  console.log(updatedData, "========")


  const UpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token')

      // const response = await updateUser(userId, updatedData); 
      const response = await axios.put(`http://localhost:3002/api/update/${userId}`, updatedData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(response.data);
    } catch (error) {
      console.error("Error updating user data:", error.message);
      navigate("/dashboard");
    }
  };

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userData) {
      setUpdatedData({
        firstname: userData?.firstname,
        lastname: userData?.lastname,
        email: userData?.email,
        gender: userData?.gender,
        maritialstatus: userData?.maritialstatus,
        profile: userData?.profile,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setUpdatedData({ ...updatedData, [name]: files[0] });
    } else if (type === "checkbox") {
      setUpdatedData({ ...updatedData, [name]: checked });
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // const handleSubmit = () => {
  //   UpdateProfile();
  //   setIsEditing(false);
  // };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      const userId = localStorage.getItem("id");
      await changePassword(userId, passwordData);
      // const token = localStorage.getItem('token')

      alert("Password changed successfully!");
      setIsChangingPassword(false);

      console.log(passwordData, "passwordData==========")
    } catch (error) {
      console.error("Error changing password:", error.message);
      alert("Failed to change password");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {isEditing ? (
          <form onSubmit={UpdateProfile}>
            <div>
              <h3>Edit Your Profile</h3>
              <div>
                <label>Profile Picture:</label>
                <input type="file" name="profile" onChange={handleChange} />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  value={updatedData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastname"
                  value={updatedData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
                <label>Gender:</label>
                <select
                  name="gender"
                  value={updatedData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div> */}
              <div className="gender-container">
            <label className="gender-label">Gender:</label>
            <div className="gender-options">
              <label><input type="radio" name="gender" value="male" checked={updatedData.gender === "male"} onChange={handleChange}  />Male</label>
              <label><input type="radio" name="gender" value="female" checked={updatedData.gender === "female"} onChange={handleChange}  />Female</label>
            </div>
          </div>
              <div>
                <label>Marital Status:</label>
                <input
                  type="checkbox"
                  name="maritialstatus"
                  checked={updatedData.maritialstatus}
                  onChange={handleChange}
                /> Married
              </div>
              <button className="button" type="submit">Save Profile</button>
              <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : isChangingPassword ? (
          <div>
            <h3>Change Password</h3>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
            <button className="button" onClick={handlePasswordSubmit}>Change Password</button>
            <button className="button" onClick={() => setIsChangingPassword(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h3>Welcome, {userData.firstname}!</h3>
            {userData.profile && (
              <div>
                <p>Profile Picture:</p>
                <img
                  src={`http://localhost:3002/profiles/${userData.profile}`}
                  alt="Profile"
                  className="profile-pic"
                />
              </div>
            )}
            <p>First Name: {userData.firstname}</p>
            <p>Last Name: {userData.lastname}</p>
            <p>Email: {userData.email}</p>
            <p>Gender: {userData.gender}</p>
            <p>Marital Status: {userData.maritialstatus ? "Married" : "Unmarried"}</p>
            <button className="button" onClick={() => setIsEditing(true)}>Update Profile</button>
            <button className="button" onClick={() => setIsChangingPassword(true)}>Change Password</button> {/* Add this line */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
