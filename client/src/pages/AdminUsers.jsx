import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      console.log("Users Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchUsers();
  }, []);

  const changeRole = async (id, role) => {
    try {
      const response = await API.put(
        `/admin/users/${id}`,
        { role }
      );

      alert(
        response.data.message ||
        "Role updated successfully"
      );

      fetchUsers();
    } catch (error) {
      console.log("Role Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to update role"
      );
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.delete(
        `/admin/users/${id}`
      );

      alert(
        response.data.message ||
        "User deleted successfully"
      );

      fetchUsers();
    } catch (error) {
      console.log("Delete User Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete user"
      );
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText =
      search.toLowerCase();

    return (
      user.name
        ?.toLowerCase()
        .includes(searchText) ||
      user.email
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading Users...
      </h3>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="container">

        <div className="admin-heading">
          <h1>User Management</h1>

          <p>
            Manage ShopEasy customers and admin users
          </p>
        </div>

        <div className="admin-user-tools">

          <div className="row g-3 align-items-center">

            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search user by name or email..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="col-md-4">
              <div className="user-count-box">
                👥 Total Users:{" "}
                <strong>{users.length}</strong>
              </div>
            </div>

          </div>

        </div>

        <div className="admin-user-list">

          <div className="user-list-header">
            <h4>All Users</h4>

            <span>
              Showing {filteredUsers.length} of{" "}
              {users.length}
            </span>
          </div>

          <div className="table-responsive">

            <table className="table table-bordered align-middle">

              <thead className="table-dark">

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-5"
                    >
                      <h5>
                        😔 No Users Found
                      </h5>

                      <p className="text-muted mb-0">
                        Try another search.
                      </p>
                    </td>
                  </tr>

                ) : (

                  filteredUsers.map(
                    (user, index) => (

                      <tr key={user._id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <strong>
                            {user.name}
                          </strong>
                        </td>

                        <td>
                          {user.email}
                        </td>

                        <td>

                          {user.role === "admin" ? (

                            <span className="badge bg-danger">
                              🛡️ Admin
                            </span>

                          ) : (

                            <span className="badge bg-primary">
                              👤 User
                            </span>

                          )}

                        </td>

                        <td>
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>

                        <td>

                          <select
                            className="form-select form-select-sm d-inline-block user-role-select"
                            value={user.role}
                            onChange={(e) =>
                              changeRole(
                                user._id,
                                e.target.value
                              )
                            }
                          >

                            <option value="user">
                              User
                            </option>

                            <option value="admin">
                              Admin
                            </option>

                          </select>

                          <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() =>
                              deleteUser(user._id)
                            }
                          >
                            🗑️ Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminUsers;