import React, { useState } from "react";

function EditEmployeePage() {
  const [name, setName] = useState("John Doe");
  const [designation, setDesignation] = useState("Developer");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Employee Updated: ${name}, ${designation}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Employee</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditEmployeePage;
