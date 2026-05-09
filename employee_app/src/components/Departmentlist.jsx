import React from "react";

function DepartmentList() {
  const departments = [
    { id: 1, name: "HR", location: "HQ" },
    { id: 2, name: "IT", location: "HQ" },
  ];

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map((dep) => (
          <li key={dep.id}>
            {dep.name} - {dep.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
