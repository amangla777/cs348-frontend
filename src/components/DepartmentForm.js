import React, { useState } from 'react';
import axios from 'axios';

const DepartmentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/departments`, { name });
      setName('');
      setError('');
      onAdd && onAdd(); // trigger refresh
    } catch (err) {
      console.error('DeptForm POST failed:', err.response || err.message);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Department</h3>
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <button type="submit">Add Department</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default DepartmentForm;
