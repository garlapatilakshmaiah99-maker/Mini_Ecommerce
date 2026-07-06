import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchUsers() {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/users"
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(id) {
    try {
      await axios.delete(
        `http://localhost:9000/api/users/delete/${id}`
      );

      alert("User Deleted Successfully");

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Delete User Failed");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="content">
        <div className="admin-users-page">
          <h2>Users Management</h2>

          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="action-btn"
                      onClick={() =>
                        navigate(`/users/${user._id}`)
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteUser(user._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;