import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import "./TeacherSignUp.css";
import axios from "axios";
import config from "../config";

export function TeacherSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    surName: "",
    dateOfBirth: "",
    mobileNo: "",
    lineId: "",
    currentLocation: "",
    highestEducation: "",
  });

  const [preferSubjects, setPreferSubjects] = useState([]);
  const [idCardFile, setIdCardFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subjectOptions = [
    { value: "English", label: "ภาษาอังกฤษ" },
    { value: "Thai", label: "ภาษาไทย" },
    { value: "Mathematics", label: "คณิตศาสตร์" },
    { value: "Programming", label: "คอมพิวเตอร์" },
    { value: "Science", label: "วิทยาศาสตร์" },
  ];

  // Real-time password validations
  const isPasswordValid = formData.password.length >= 6;
  const doPasswordsMatch = formData.password === formData.confirmPassword;
  const showMatchStatus = formData.confirmPassword.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPreferSubjects((prev) => [...prev, value]);
    } else {
      setPreferSubjects((prev) => prev.filter((subject) => subject !== value));
    }
  };

  const handleFileChange = (e) => {
    setIdCardFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // // Final safety checks
    if (!isPasswordValid) {
      setError("รหัสผ่านต้องยาวอย่างน้อย 6 ตัว");
      return;
    }
    if (!doPasswordsMatch) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    if (preferSubjects.length === 0) {
      setError("กรุณาเลือกวิชาสอนอย่างน้อย 1 วิชา");
      return;
    }
    if (!idCardFile) {
      setError("โปรดอัพโหลดบัตรประชาชนเพื่อยืนยันตัวตน");
      return;
    }

    setLoading(true);

    try {
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });
      submissionData.append("preferSubjects", JSON.stringify(preferSubjects));
      submissionData.append("idCard", idCardFile);

      await axios.post(
        config.apiPath + "/api/teachers/signup",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message = err.response?.data?.message || "การส่งข้อมูลล้มเหลว";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <title>Teacher Sign-up</title>
        <link rel="icon" type="image/svg+xml" href="/teacher-signup.svg" />
        <Header />

        <div className="signup-container">
          <div className="signup-card">
            <h2 style={{ color: "#28a745", marginBottom: "10px" }}>
              Application Sent! 🎉
            </h2>
            <p>
              ยินดีด้วยคุณ {formData.firstName},
              ท่านเราได้รับข้อมูลที่ท่านกรอกแล้วนะครับ จะติดต่อกลับภายหลัง
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <title>Teacher Sign-up</title>
      <link rel="icon" type="image/svg+xml" href="/teacher-signup.svg" />
      <Header />

      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-card">
          <h2>สมัครเป็นครูสอนออนไลน์</h2>
          <p className="signup-subtitle">
            กรอกแบบฟอร์มด้านล่างเพื่อลงทะเบียนบัญชีและยืนยันข้อมูลโปรไฟล์ของคุณ
          </p>

          {error && <p className="error-message">{error}</p>}

          <div className="form-row">
            <div className="input-group">
              <label className="form-label">ชื่อ</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="form-label">นามสกุล</label>
              <input
                type="text"
                name="surName"
                value={formData.surName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">อิเมล์</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="form-label">สร้างรหัสผ่าน</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              {formData.password && (
                <span
                  className={`realtime-hint ${isPasswordValid ? "valid" : "invalid"}`}
                >
                  {isPasswordValid
                    ? "✓ รหัสผ่านโอเค"
                    : "✗ รหัสต้องยาวอย่างน้อย 6 ตัว"}
                </span>
              )}
            </div>
            <div className="input-group">
              <label className="form-label">ยืนยันรหัสผ่าน</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
              {showMatchStatus && (
                <span
                  className={`realtime-hint ${doPasswordsMatch ? "valid" : "invalid"}`}
                >
                  {doPasswordsMatch
                    ? "✓ รหัสผ่านตรงกันดี"
                    : "✗ รหัสยืนยันไม่ตรงกัน"}
                </span>
              )}
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">
              วันเกิด{" "}
              <span
                style={{
                  color: "#65676b",
                  fontWeight: "normal",
                  fontSize: "12px",
                  backgroundColor: "white",
                }}
              ></span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="form-label">เบอร์มือถือ</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="0812345678"
                required
                className="form-input"
              />
            </div>
            <div className="input-group">
              <label className="form-label">ไอดีไลน์</label>
              <input
                type="text"
                name="lineId"
                value={formData.lineId}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">ที่อยู่ปัจจุบัน</label>
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              placeholder="เช่น...บางขุนเทียน กทม"
              required
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="form-label">จบการศึกษาล่าสุด</label>
            <select
              name="highestEducation"
              value={formData.highestEducation}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">ระดับการศึกษาของท่าน...</option>
              <option value="Bachelor">ปริญญาตรี</option>
              <option value="Master">ปริญญาโท</option>
              <option value="Doctorate">ปริญญาเอก</option>
              <option value="Other">อื่น ๆ</option>
            </select>
          </div>

          <div className="input-group">
            <label className="form-label">
              ต้องการสอนวิชาใดบ้าง (เลือกตามประสงค์)
            </label>
            <div className="checkbox-container">
              {subjectOptions.map((option) => (
                <label key={option.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={preferSubjects.includes(option.value)}
                    onChange={handleCheckboxChange}
                    className="form-checkbox"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">
              ยืนยันตัวตน (อัพโหลดบัตรประชาชนเป็นไฟล์สกุลรูป หรือ .pdf)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              required
              className="file-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isPasswordValid || !doPasswordsMatch}
            className="submit-button"
          >
            {loading ? "กำลังยื่นใบสมัครของท่าน..." : "ยื่นใบสมัครสำเร็จ"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
