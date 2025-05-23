import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

const initialUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Student', status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Teacher', status: 'Inactive' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Admin', status: 'Active' },
];

const roles = ['Student', 'Teacher', 'Admin'];
const statuses = ['Active', 'Inactive'];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: '', email: '', role: roles[0], status: statuses[0] });
  const [successPopup, setSuccessPopup] = useState({ visible: false, message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, userId: null, userName: '' });
  const [errorPopup, setErrorPopup] = useState({ visible: false, message: '' });

  const navigate = useNavigate();

  const handleInputChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddUser = (e) => {
    e.preventDefault();
    const emailExists = users.some(user => user.email.toLowerCase() === form.email.toLowerCase());
    if (!form.name.trim() || !form.email.trim()) {
      setErrorPopup({ visible: true, message: 'Please fill in Name and Email.' });
      return;
    }
    if (emailExists) {
      setErrorPopup({ visible: true, message: 'This email is already registered.' });
      return;
    }
    setUsers(prev => [...prev, { id: Date.now(), ...form }]);
    setSuccessPopup({ visible: true, message: `Successfully added user "${form.name}"!` });
    setForm({ name: '', email: '', role: roles[0], status: statuses[0] });
  };

  const requestDeleteUser = (id, name) => {
    setConfirmDelete({ visible: true, userId: id, userName: name });
  };

  const cancelDelete = () => {
    setConfirmDelete({ visible: false, userId: null, userName: '' });
  };

  const confirmDeleteUser = () => {
    setUsers(prev => prev.filter(user => user.id !== confirmDelete.userId));
    setConfirmDelete({ visible: false, userId: null, userName: '' });
    setSuccessPopup({ visible: true, message: 'User removed successfully!' });
  };

  const closeSuccessPopup = () => setSuccessPopup({ visible: false, message: '' });
  const closeErrorPopup = () => setErrorPopup({ visible: false, message: '' });

  return (
    <>
      {/* Back to Dashboard Button */}
      <div className="back-btn-container">
        <button
          className="btn-back-dashboard"
          onClick={() => navigate('/admin-dashboard')}
          aria-label="Go back to Admin Dashboard"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className={`user-management-container ${successPopup.visible || confirmDelete.visible || errorPopup.visible ? 'blurred' : ''}`}>
        <h1>User Management</h1>

        <form className="user-form" onSubmit={handleAddUser}>
          <div className="form-row">
            <label>Name:</label>
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <label>Role:</label>
            <select name="role" value={form.role} onChange={handleInputChange}>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Status:</label>
            <select name="status" value={form.status} onChange={handleInputChange}>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-submit">Add User</button>
        </form>

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td></tr>
            ) : users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn-remove"
                    onClick={() => requestDeleteUser(user.id, user.name)}
                    title={`Remove ${user.name}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Success Popup */}
      {successPopup.visible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{successPopup.message}</p>
            <button onClick={closeSuccessPopup} className="btn-close-popup">OK</button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorPopup.visible && (
        <div className="popup-overlay">
          <div className="popup-content error-popup">
            <p>{errorPopup.message}</p>
            <button onClick={closeErrorPopup} className="btn-close-popup">OK</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete.visible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to remove <strong>{confirmDelete.userName}</strong>?</h3>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={confirmDeleteUser}>Yes, Remove</button>
              <button className="btn-cancel" onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;
