import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <h2>Employee Directory</h2>

        <Link
          to="/employees"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Employees
        </Link>

        <Link
          to="/create-employee"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Create Employee
        </Link>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
