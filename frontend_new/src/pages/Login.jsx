import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ Handle backend response properly
      if (res.data.message === "Login successful") {

        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login successful ✅");

        setIsLoggedIn(true);
        setPage("products");

      } else {
        alert(res.data.message); // User not found / invalid password
      }

    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setPage("register")}
        >
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;