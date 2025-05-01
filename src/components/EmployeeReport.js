import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeReport = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("https://cs348-backend-0kqe.onrender.com/api/employees")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const generateReport = () => {
    axios.get("https://cs348-backend-0kqe.onrender.com/api/employees")
      .then(res => {
        const filtered = res.data.filter(emp => emp.department_id?._id === selectedDept);
        setEmployees(filtered);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="report-box">
      <h3>📊 Employee Report</h3>
      <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
        <option value="">Select Department</option>
        {departments.map(dept => (
          <option key={dept._id} value={dept._id}>{dept.name}</option>
        ))}
      </select>
      <button onClick={generateReport}>Generate Report</button>

      {selectedDept && (
        <div className="report-result">
          <h4>Results:</h4>
          <p><b>Total Employees:</b> {employees.length}</p>
          <ul>
            {employees.map(emp => (
              <li key={emp._id}>{emp.name} - {emp.position}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeReport;
