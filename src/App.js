import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import EmployeeReport from './components/EmployeeReport';
import DepartmentForm from './components/DepartmentForm'; // ✅ Add this import
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="App">
      <h1>📋 Company Management System</h1>

      {/* ✅ Add Department Section */}
      <DepartmentForm onAdd={() => setRefresh(!refresh)} />

      <EmployeeForm
        onAdd={() => setRefresh(!refresh)}
        onUpdate={() => {
          setRefresh(!refresh);
          setEditing(null);
        }}
        editingEmployee={editing}
        refresh={refresh}
      />
      <EmployeeList
        onEdit={emp => setEditing(emp)}
        refresh={refresh}
      />
      <EmployeeReport />
    </div>
  );
}

export default App;
