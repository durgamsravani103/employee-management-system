import React, { useEffect, useState } from "react";
import client from "../api/client";
import Header from "./Header";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.get("/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Header />

      <h1>Employees</h1>

      {employees.map((emp) => (
        <div
          key={emp.id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{emp.name}</h3>

          <p>{emp.email}</p>

          <p>{emp.designation}</p>

          <p>{emp.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;
