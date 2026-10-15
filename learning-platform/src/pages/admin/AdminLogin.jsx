import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import "./AdminLogin.css";
import { adminLogin } from "../../api/adminApi";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin(username, password);
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Admin Sign In</title>
      <link rel="icon" type="image/svg+xml" href="/admin.svg" />
      <Header />

      <div className="admin-wrapper">
        <form className="from" onSubmit={handleSubmit}>
          <h2 className="heading">Admin Login</h2>

          {error && <p className="error">{error}</p>}

          <label className="label">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </label>

          <label className="label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </label>

          <button type="submit" disabled={loading} className="button">
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าระบบสำเร็จ"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
