import React, { useState } from "react";
import './AddUserModal.css'; 
import { addUser } from "../../api"; 

const AddUserModal = ({ show, onClose, setUsersList, currentUserId }) => {  
  const [newUser, setNewUser] = useState({ firstname: "", lastname: "", email: "" , createdBy: "" });
  const [error, setError] = useState("");

  const handleChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
 
  const id = localStorage.getItem('id')
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userWithId = { ...newUser, addedBy: currentUserId , createdBy:id}; 
      console.log(userWithId , "userWithId")
      await addUser(userWithId);
      setUsersList(prev => [...prev, userWithId]); 
      setNewUser({ firstname: "", lastname: "", email: "" }); 
      onClose(); 
    } catch (error) {
      console.error("Error adding user:", error.message);
      setError("Failed to add user.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Add User</h3>
        <form onSubmit={handleAddUser}>
          <input type="text" name="firstname" placeholder="First Name" value={newUser.firstname} onChange={handleChangeNewUser} required />
          <input type="text" name="lastname" placeholder="Last Name" value={newUser.lastname} onChange={handleChangeNewUser} required />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChangeNewUser} required />
          <button type="submit" className="button">Add User</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;  
