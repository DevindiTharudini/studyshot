import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import './ModuleManagement.css';

const ModuleManagement = () => {
  const [modules, setModules] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', description: '', status: 'Active' });
  const [successPopup, setSuccessPopup] = useState({ visible: false, message: '' });
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, moduleId: null, moduleName: '' });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchModules() {
      const modulesCol = collection(db, 'modules');
      const modulesSnapshot = await getDocs(modulesCol);
      const modulesList = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setModules(modulesList);
    }
    fetchModules();
  }, []);

  const handleEdit = (module) => {
    setForm({
      id: module.id,
      name: module.name,
      description: module.description,
      status: module.status || 'Active',
    });
    window.scrollTo(0, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      alert('Please fill in Module Name and Description.');
      return;
    }

    try {
      if (form.id) {
        // Update existing
        const moduleRef = doc(db, 'modules', form.id);
        await updateDoc(moduleRef, {
          name: form.name,
          description: form.description,
          status: form.status,
        });
        setModules(prev => prev.map(m => (m.id === form.id ? { id: form.id, ...form } : m)));
        setSuccessPopup({ visible: true, message: `Module "${form.name}" updated!` });
      } else {
        // Add new
        const docRef = await addDoc(collection(db, 'modules'), {
          name: form.name,
          description: form.description,
          status: form.status,
        });
        setModules(prev => [...prev, { id: docRef.id, ...form }]);
        setSuccessPopup({ visible: true, message: `Module "${form.name}" added!` });
      }
    } catch (error) {
      alert('Error saving module: ' + error.message);
    }

    // Reset form
    setForm({ id: null, name: '', description: '', status: 'Active' });
  };

  const requestDeleteModule = (id, name) => {
    setConfirmDelete({ visible: true, moduleId: id, moduleName: name });
  };

  const confirmDeleteModule = async () => {
    try {
      const moduleRef = doc(db, 'modules', confirmDelete.moduleId);
      await deleteDoc(moduleRef);
      setModules(prev => prev.filter(m => m.id !== confirmDelete.moduleId));
      setSuccessPopup({ visible: true, message: 'Module removed successfully!' });
    } catch (error) {
      alert('Error deleting module: ' + error.message);
    }
    setConfirmDelete({ visible: false, moduleId: null, moduleName: '' });
  };

  const cancelDelete = () => {
    setConfirmDelete({ visible: false, moduleId: null, moduleName: '' });
  };

  const toggleStatus = async (id) => {
    const module = modules.find(m => m.id === id);
    if (!module) return;
    const newStatus = module.status === 'Active' ? 'Inactive' : 'Active';

    try {
      const moduleRef = doc(db, 'modules', id);
      await updateDoc(moduleRef, { status: newStatus });
      setModules(prev =>
        prev.map(m =>
          m.id === id ? { ...m, status: newStatus } : m
        )
      );
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const closeSuccessPopup = () => setSuccessPopup({ visible: false, message: '' });
  const backToDashboard = () => navigate('/admin-dashboard');

  return (
    <>
      {(successPopup.visible || confirmDelete.visible) && <div className="module-management blurred" />}

      <div className={`module-management ${successPopup.visible || confirmDelete.visible ? 'blurred' : ''}`}>
        <div className="module-header">
          <h1>Module Management</h1>
          <button className="btn-back-dashboard" onClick={backToDashboard}>
            ← Back to Dashboard
          </button>
        </div>

        <form className="module-form" onSubmit={handleFormSubmit}>
          <h2>{form.id ? 'Edit Module' : 'Add New Module'}</h2>

          <div className="form-row">
            <label>Module Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Enter module name"
            />
          </div>

          <div className="form-row">
            <label>Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Enter module description"
              rows="3"
            />
          </div>

          <div className="form-row">
            <label>Status:</label>
            <select name="status" value={form.status} onChange={handleInputChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {form.id ? 'Update Module' : 'Add Module'}
            </button>
          </div>
        </form>

        <div className="modules-table-wrapper">
          <table className="modules-table">
            <thead>
              <tr>
                <th>Module Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No modules found.</td>
                </tr>
              ) : (
                modules.map(module => (
                  <tr key={module.id}>
                    <td>{module.name}</td>
                    <td>{module.description}</td>
                    <td>{module.status}</td>
                    <td>
                      <button className="btn-action btn-edit" onClick={() => handleEdit(module)}>
                        Edit
                      </button>
                      <button className="btn-action btn-delete" onClick={() => requestDeleteModule(module.id, module.name)}>
                        Remove
                      </button>
                      <button className="btn-action btn-edit" onClick={() => toggleStatus(module.id)}>
                        {module.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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

      {/* Delete Confirmation */}
      {confirmDelete.visible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>
              Are you sure you want to remove <strong>{confirmDelete.moduleName}</strong>?
            </h3>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={confirmDeleteModule}>
                Yes, Remove
              </button>
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleManagement;
