import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        username: username,
        password: password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.access_token);

      alert("Login Success");

      navigate("/employees");
    } catch (error) {
      console.log(error.response);

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Employee Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
