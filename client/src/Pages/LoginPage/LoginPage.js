import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ employeeId: "", password: "" });

  // Dummy user list (replace this with API calls in real app)
  const dummyUsers = [
    {
      employeeId: "PRIN-001",
      name: "John Doe",
      role: "principal",
      schoolId: "64f1aa000000000000000010",
      email: "principal@srdigi.edu",
      mobile: "1234567890",
      password: "john1234",
    },
    {
      employeeId: "TEACH-001",
      password: "naveen1234",
      role: "teacher",
      name: "Naveen Kumar",
      id: "64f1aa110001110000000011",
      schoolId: "64f1aa000000000000000010",
      subject: "Physics",
      isPaperSetter: true,
      phone: "9876543211",
    },
    {
      employeeId: "STUD-002",
      password: "anjali1234",
      role: "student",
      name: "Anjali Singh",
      id: "stud-002",
      class: "10B",
      phone: "8765432109",
    },
  ];

  useEffect(() => {
    sessionStorage.removeItem("user");
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = dummyUsers.find(
      (u) => u.employeeId === form.employeeId && u.password === form.password
    );

    if (foundUser) {
      login(foundUser); // Store user in AuthContext + session
      sessionStorage.setItem("user", JSON.stringify(foundUser));

      // Role-based routing
      if (foundUser.role === "principal") navigate("/principal/dashboard");
      else if (foundUser.role === "teacher") navigate("/teacher/dashboard");
      else if (foundUser.role === "student") navigate("/student/dashboard");
    } else {
      alert("Invalid Employee ID or Password!");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center text-primary mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              className="form-control"
              value={form.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-slash" : "bi-eye"
              } position-absolute`}
              style={{ top: "38px", right: "15px", cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="text-end mb-3">
            <button
              type="button"
              className="btn btn-link text-decoration-none small text-primary"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
