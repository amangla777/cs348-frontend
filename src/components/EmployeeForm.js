import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ onAdd, editingEmployee, onUpdate, refresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department_id: ''
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/api/departments`)
       .then(res => setDepartments(res.data))
       .catch(err => console.error('Dept fetch error:', err));
   }, [refresh]);

  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData({ name: '', email: '', position: '', department_id: '' });
    }
  }, [editingEmployee]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingEmployee) {
      axios.put(`${process.env.REACT_APP_API}/api/employees/${editingEmployee._id}`, formData)
        .then(res => {
          onUpdate(res.data);
          setFormData({ name: '', email: '', position: '', department_id: '' });
        });
    } else {
      axios.post(`${process.env.REACT_APP_API}/api/employees`, formData)
        .then(res => {
          onAdd(res.data);
          setFormData({ name: '', email: '', position: '', department_id: '' });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <h3>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
      <select name="department_id" value={formData.department_id} onChange={handleChange} required>
        <option value="">Select Department</option>
        {departments.map(dept => (
          <option key={dept._id} value={dept._id}>{dept.name}</option>
        ))}
      </select>
      <button type="submit">{editingEmployee ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default EmployeeForm;
