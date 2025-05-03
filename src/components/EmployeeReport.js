import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:3000';

export default function EmployeeReport() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [employees, setEmployees] = useState([]);

  // load departments once
  useEffect(() => {
    axios
      .get(`${API}/api/departments`)
      .then(r => setDepartments(r.data))
      .catch(e => console.error('Failed to load departments:', e));
  }, []);

  const generateReport = () => {
    if (!selectedDept) {
      setEmployees([]);
      return;
    }

    // fetch all employees, then filter in JS by the populated dept._id
    axios
      .get(`${API}/api/employees`)
      .then(r => {
        const filtered = r.data.filter(emp => 
          emp.department_id && emp.department_id._id === selectedDept
        );
        setEmployees(filtered);
      })
      .catch(e => console.error('Failed to load employees:', e));
  };

  return (
    <div className="report-box">
      <h3>📊 Employee Report by Department</h3>
      <select
        value={selectedDept}
        onChange={e => {
          setSelectedDept(e.target.value);
          setEmployees([]);            // clear old list immediately
        }}
      >
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>
      <button onClick={generateReport}>Generate Report</button>

      {selectedDept && (
        <div className="report-result">
          <h4>
            {departments.find(d => d._id===selectedDept)?.name}
             — {employees.length} Employee{employees.length!==1 && 's'}
          </h4>
          <ul>
            {employees.map(emp => (
              <li key={emp._id}>
                {emp.name} — {emp.position} ({emp.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
