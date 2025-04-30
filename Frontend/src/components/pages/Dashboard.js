
import React, { useEffect, useState } from "react";
import { getregisterbyid, getPeginatedData, importUsers } from "../../api";
import UserProfileModal from "./UserProfileModal";
import AddUserModal from "./AddUserModal";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import View from "./View";
import { CSVLink } from "react-csv";
import PaginationOutlined from "./PaginationOutlined"
import Papa from "papaparse";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [pageNo, setpageNo] = useState(1)

  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const loadUserProfile = async () => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        throw new Error("No user ID found, please log in again.");
      }
      const response = await getregisterbyid(userId);
      setUserData(response);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setError("Failed to load user profile");
      navigate("/");
    }
  };

  const loadUsersList = async (page = 1, search = "") => {
    try {
      const response = await getPeginatedData(page, search, userId);
      setUsersList(response.data.user);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users list:", error.message);
      setError("Failed to load users list");
    }
  };

  useEffect(() => {
    loadUserProfile();
    loadUsersList(currentPage, searchTerm);
  }, []);
const [users, setUsers] = useState([])
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
  }

  const handleSearch = async (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    await loadUsersList(1, searchValue);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await loadUsersList(page, searchTerm);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
  };

  const handleShowAddUser = () => {
    setShowAddUser(true);
  };

  const [result, setResult] = useState(null);
  const [showview, setShowView] = useState(false);

  // CSV Import 
  const handleCSVImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await importUsers(file);
      alert("CSV imported successfully!");
      loadUsersList(currentPage, searchTerm);
    } catch (error) {
      console.error("Error importing CSV:", error.message);
      setError("Failed to import CSV");
    }
  };


    const handleFile = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (res) => {
                    console.log(res.data)
                    setUsers(res.data)
                    try {
                        const resp = await axios.post(`http://localhost:3002/api/import/${userId}`, {
                            users: res.data
                        })
                        console.log(resp.data)
                    } catch (error) {
                        console.log(error.message)
                    }
                }
            })
        }
    }


  // CSV Export 
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" }
  ];


  const csvData = usersList.map(user => ({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
  }));

  return (
    <div>

<div className="dashboard">
  <h2 className="dashboard-title">User Management</h2>

  <div className="top-controls">
    <div className="action-buttons">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button className="button" onClick={handleShowProfile}>View My Profile</button>
      <button className="button" onClick={handleShowAddUser}>Add User</button>
    </div>

    <div className="csv-buttons">
      <label htmlFor="csvInput" className="import-btn">
        Import CSV
        <input
          type="file"
          id="csvInput"
          accept=".csv"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </label>
      <CSVLink
        data={csvData}
        headers={headers}
        filename={"user_data.csv"}
        className="export-btn"
      >
        Export CSV
      </CSVLink>
    </div>
  </div>
        <UserProfileModal
          userData={userData}
          setUserData={setUserData}
          show={showProfile}
          onClose={() => setShowProfile(false)}
        />
        <AddUserModal
          show={showAddUser}
          onClose={() => setShowAddUser(false)}
          setUsersList={setUsersList}
          currentUserId={userData?.id}
        />
        {error && <p className="error">{error}</p>}


        <h3>Users List</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by first name"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => {
                      setShowView(!showview);
                      setResult(user);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showview && <View result={result} />}

        {/* Pagination Controls */}
        <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
          ))}
        </div>
      </div>
      <PaginationOutlined
        totalPages={totalPages}
        pageNo={pageNo} setpageNo={setpageNo}
      />
    </div>
  );
};

export default Dashboard;
