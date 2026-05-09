import React, { useState } from "react";

function CreateDepartmentPage() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("HQ");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Department Created: ${name}, ${location}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Department</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default CreateDepartmentPage;
