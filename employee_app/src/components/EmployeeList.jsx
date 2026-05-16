import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/employees/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/employees/",
        {
          name,
          email,
          designation,
          phone,
          department_id: Number(departmentId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Employee Added Successfully");

      setName("");
      setEmail("");
      setDesignation("");
      setPhone("");
      setDepartmentId("");

      fetchEmployees();
    } catch (error) {
      console.log(error);

      alert("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Employee Deleted");

      fetchEmployees();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="number"
          placeholder="Department ID"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        />

        <br />

        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Designation</th>

            <th>Phone</th>

            <th>Department ID</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>

              <td>{employee.name}</td>

              <td>{employee.email}</td>

              <td>{employee.designation}</td>

              <td>{employee.phone}</td>

              <td>{employee.department_id}</td>

              <td className="actions">
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
