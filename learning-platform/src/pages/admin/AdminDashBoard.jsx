import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTeachers } from "../../api/adminApi";
import "./AdminDashBoard.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const SEEN_IDS_KEY = "adminSeenTeacherIds";

export function AdminDashboard() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [newTeacherIds, setNewTeacherIds] = useState([]);
  const hasLoadedRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // ปรับจำนวนต่อหน้าได้ตามต้องการ
  const totalPages = Math.ceil(teachers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTeachers = teachers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const loadTeachers = async () => {
    try {
      const data = await fetchTeachers();
      setTeachers(data);

      // อ่านรายชื่อ id ที่ admin เคยเห็นแล้ว (จาก localStorage)
      const seenIdsRaw = localStorage.getItem(SEEN_IDS_KEY);
      const seenIds = seenIdsRaw ? JSON.parse(seenIdsRaw) : null;

      if (seenIds === null) {
        // เข้าดู dashboard เป็นครั้งแรกสุด (ไม่เคยมีประวัติเลย)
        // ไม่ไฮไลต์ใครเลย ถือว่าทุกคนที่มีอยู่แล้วคือ "เก่า"
        setNewTeacherIds([]);
      } else {
        // ใครก็ตามที่ id ยังไม่อยู่ในรายชื่อที่เคยเห็น = คนใหม่
        const newIds = data
          .filter((t) => !seenIds.includes(t.id))
          .map((t) => t.id);
        setNewTeacherIds(newIds);
      }

      // อัปเดตรายชื่อที่เคยเห็น ให้รวมทุกคนที่เห็นในครั้งนี้ด้วย
      const allIds = data.map((t) => t.id);
      localStorage.setItem(SEEN_IDS_KEY, JSON.stringify(allIds));
    } catch (err) {
      setError(err.message || "ไม่สามารถโหลดข้อมูลการลงทะเบียนครูได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;
    loadTeachers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) return <p className="loading">Loading...</p>;

  const columnLabels = {
    id: "ลำดับ",
    email: "อีเมล",
    firstName: "ชื่อ",
    surName: "นามสกุล",
    dateOfBirth: "วันเกิด",
    mobileNo: "เบอร์โทร",
    lineId: "ไลน์ไอดี",
    currentLocation: "ที่อยู่ปัจจุบัน",
    highestEducation: "วุฒิการศึกษา",
    preferSubjects: "วิชาที่ต้องการสอน",
    idCardPath: "สำเนาบัตรประชาชน",
    createdAt: "วันที่สมัคร",
  };

  const educationLabels = {
    "High School": "มัธยมศึกษาตอนปลาย",
    Bachelor: "ปริญญาตรี",
    Master: "ปริญญาโท",
    Doctorate: "ปริญญาเอก",
  };

  const subjectLabels = {
    Thai: "ภาษาไทย",
    English: "ภาษาอังกฤษ",
    Mathematics: "คณิตศาสตร์",
    Science: "วิทยาศาสตร์",
    Programming: "การเขียนโปรแกรม",
    // เพิ่มวิชาอื่นๆ ตามที่มีในฟอร์มสมัครของคุณ
  };

  return (
    <>
      <title>Admin Dashboard</title>
      <link rel="icon" type="image/svg+xml" href="/admin-dashboard.svg" />
      <Header />

      <div
        style={{
          padding: "2rem",
          fontFamily: "sans-serif",
          paddingTop: "100px",
        }}
      >
        <div className="header">
          <h2>ใบสมัครครู</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {error && <p className="error">{error}</p>}

        {!error && teachers.length === 0 && <p>ยังไม่มีครูลงทะเบียน</p>}

        {!error && teachers.length > 0 && (
          <div className="table-wrapper">
            <table border="1" cellPadding="8" className="table">
              <thead>
                <tr>
                  {Object.keys(teachers[0]).map((col) => (
                    <th key={col}>{columnLabels[col] || col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className={
                      newTeacherIds.includes(teacher.id) ? "new-row" : ""
                    }
                  >
                    {Object.entries(teacher).map(([key, val]) => (
                      <td key={key}>
                        {key === "createdAt" || key === "dateOfBirth" ? (
                          new Date(val).toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        ) : key === "idCardPath" ? (
                          <img
                            src={`http://localhost:5000/${val.replace(/\\/g, "/")}`}
                            alt="บัตรประชาชน"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "4px",
                            }}
                          />
                        ) : key === "highestEducation" ? (
                          educationLabels[val] || val
                        ) : key === "preferSubjects" ? (
                          JSON.parse(val)
                            .map((subject) => subjectLabels[subject] || subject)
                            .join(", ")
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ก่อนหน้า
          </button>

          <span>
            หน้า {currentPage} จาก {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            ถัดไป
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}
