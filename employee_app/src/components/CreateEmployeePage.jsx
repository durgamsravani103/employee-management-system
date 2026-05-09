import { useState } from "react";
import client from "../api/client";
import Header from "./Header";

function CreateEmployeePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await client.post(
        "/employees/",
        {
          name: name,
          email: email,
          designation: designation,
          phone: phone,
          department_id: Number(departmentId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Employee Created");
    } catch (error) {
      console.log(error);

      alert("Error creating employee");
    }
  };

  return (
    <div>
      <Header />

      <div style={{ padding: "20px" }}>
        <h2>Create Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <br />
          <br />

          <input
            type="number"
            placeholder="Department ID"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployeePage;
