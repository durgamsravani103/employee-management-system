import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setEmployees(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <h1>Employee List</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "30px",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>

              <td>{employee.name}</td>

              <td>{employee.email}</td>

              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
