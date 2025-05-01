import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ onEdit, refresh }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const fetchEmployees = () => {
    axios.get("https://cs348-backend-0kqe.onrender.com/api/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const deleteEmployee = id => {
    axios.delete(`https://cs348-backend-0kqe.onrender.com/api/employees/${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  };

  return (
    <div className="list-box">
      <h3>All Employees</h3>
      <ul>
        {employees.map(emp => (
          <li key={emp._id}>
            <b>{emp.name}</b> ({emp.position}) – {emp.department_id?.name || 'N/A'}
            <button onClick={() => onEdit(emp)}>✏️ Edit</button>
            <button onClick={() => deleteEmployee(emp._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
