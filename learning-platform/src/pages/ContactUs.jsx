import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import "./ContactUs.css";

export function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Track if the email is successfully sending or has sent
  const [status, setStatus] = useState({
    submissionSuccess: false,
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submissionSuccess: false, loading: true });

    // REPLACE THIS URL with your actual Formspree endpoint key
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyegbgra";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "ชื่อ - นามสกุล": formData.fullName,
          อีเมล: formData.email,
          โทรศัพท์: formData.phone,
          เรื่องที่ต้องการติดต่อ: formData.subject,
          ข้อความ: formData.message,
        }),
      });

      if (response.ok) {
        setStatus({ submissionSuccess: true, loading: false });
        // Clear out input fields upon a successful email transmission
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        setStatus({ submissionSuccess: false, loading: false });
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("ไม่สามารถส่งข้อความได้ในขณะนี้");
      setStatus({ submissionSuccess: false, loading: false });
    }
  };

  return (
    <>
      <title>Contact Us</title>
      <link rel="icon" type="image/svg+xml" href="/contact-us.svg" />
      <Header />

      <div className="single-form-container">
        <form onSubmit={handleSubmit} className="entry-form">
          <h3>สอบถามข้อมูลเพิ่มเติม</h3>

          {status.submissionSuccess && (
            <div className="success-alert">
              ✓ ส่งข้อความไปยังอีเมลเรียบร้อยแล้ว!
              เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด
            </div>
          )}

          <div className="input-group">
            <label>ชื่อ - นามสกุล*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="สมชาย ใจดี"
              disabled={status.loading}
            />
          </div>

          <div className="input-group">
            <label>อีเมล*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="somchai@example.com"
              disabled={status.loading}
            />
          </div>

          <div className="input-group">
            <label>โทรศัพท์*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0812345678"
              disabled={status.loading}
            />
          </div>

          <div className="input-group">
            <label>เรื่องที่ต้องการติดต่อ*</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="สอบถามรายวิชา / คอร์สสอนพิเศษ"
              disabled={status.loading}
            />
          </div>

          <div className="input-group">
            <label>ข้อความ*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="พิมพ์รายละเอียดข้อความของคุณที่นี่..."
              disabled={status.loading}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={status.loading}
          >
            {status.loading ? "กำลังส่งข้อความ..." : "ส่งข้อความ"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
