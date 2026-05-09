import React, { useState } from "react";

function EditDepartmentPage() {
  const [name, setName] = useState("HR");
  const [location, setLocation] = useState("HQ");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Department Updated: ${name}, ${location}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Department</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditDepartmentPage;
