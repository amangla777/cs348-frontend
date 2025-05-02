import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API || 'http://localhost:3000';

export default function EmployeeReport() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [employees, setEmployees]     = useState([]);

  // ▶︎ 1. Load departments
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/departments`)
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Failed to load departments:', err));
  }, []);

  // ▶︎ 2. When user clicks Generate, fetch employees in that dept
  const handleGenerate = () => {
    if (!selectedDept) return;

    // if your backend supports filtering by query param:
    axios
      .get(`${API_BASE}/api/employees?department_id=${selectedDept}`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to load employees:', err));
    
    // OR, if it doesn’t, you can fetch all and filter client-side:
    // axios.get(`${API_BASE}/api/employees`)
    //   .then(res => {
    //     const filtered = res.data.filter(
    //       emp => emp.department_id && emp.department_id._id === selectedDept
    //     );
    //     setEmployees(filtered);
    //   })
    //   .catch(err => console.error('Failed to load employees:', err));
  };

  return (
    <div className="report-box">
      <h3>📊 Employee Report</h3>

      <div className="form-row">
        <label htmlFor="dept-select">Department:</label>
        <select
          id="dept-select"
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
        >
          <option value="">-- select one --</option>
          {departments.map(d => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleGenerate}>
          Generate
        </button>
      </div>

      {selectedDept && (
        <div className="report-result">
          <h4>Results for “{ 
            // show the name instead of id
            departments.find(d => d._id === selectedDept)?.name 
          }”</h4>
          <p><b>Total Employees:</b> {employees.length}</p>
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Position</th></tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {employees.length === 0 && <p>No employees in this department.</p>}
        </div>
      )}
    </div>
  );
}
