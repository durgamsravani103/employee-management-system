import { useEffect, useState } from "react";

import API from "../services/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [designation, setDesignation] = useState("");

  const [phone, setPhone] = useState("");

  const [departmentId, setDepartmentId] = useState("");

  const [editId, setEditId] = useState(null);

  // FETCH EMPLOYEES

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

  // ADD / UPDATE EMPLOYEE

  const addEmployee = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editId) {
        await API.put(
          `/employees/${editId}`,
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

        alert("Employee Updated");

        setEditId(null);
      } else {
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

        alert("Employee Added");
      }

      fetchEmployees();

      setName("");

      setEmail("");

      setDesignation("");

      setPhone("");

      setDepartmentId("");
    } catch (error) {
      console.log(error);

      alert("Operation Failed");
    }
  };

  // DELETE EMPLOYEE

  const deleteEmployee = async (id) => {
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

  // EDIT EMPLOYEE

  const editEmployee = (employee) => {
    setEditId(employee.id);

    setName(employee.name);

    setEmail(employee.email);

    setDesignation(employee.designation);

    setPhone(employee.phone);

    setDepartmentId(employee.department_id);
  };

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "30px",
      }}
    >
      <h1>Employee Dashboard</h1>

      <button onClick={logout}>Logout</button>

      <br />
      <br />

      {/* FORM */}

      <form onSubmit={addEmployee}>
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

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <br />
      <br />

      {/* TABLE */}

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
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

              <td>
                <button onClick={() => editEmployee(employee)}>Edit</button>{" "}
                <button onClick={() => deleteEmployee(employee.id)}>
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
