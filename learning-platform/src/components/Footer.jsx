import subjectBook from "../assets/tool-pencil.svg";
import questionCircle from "../assets/question-circle.svg";
import lineLogo from "../assets/line-logo.svg";
import facebookLogo from "../assets/facebook-logo.svg";
import whatsAppLogo from "../assets/whatsapp-logo.svg";
import telephoneLogo from "../assets/telephone-logo.svg";
import yourLogo from "../assets/your-logo.svg";
import "./Footer.css";

export function Footer() {
  return (
    <>
      <section id="next-steps">
        <div id="docs">
          <h2>หากท่านมีคำถามใด ๆ</h2>
          <p>สอบถามเพิ่มเติม</p>
          <div className="center-point">
            <a
              href="https://www.svgrepo.com/show/352382/question-circle.svg"
              target="_blank"
            >
              <img className="marks" src={questionCircle} alt="questions" />
              คำถามที่พบบ่อย
            </a>

            <a
              href="https://www.svgrepo.com/show/219390/design-tool-pencil.svg"
              target="_blank"
            >
              <img className="marks" src={subjectBook} alt="subjects" />
              สอบถามเกี่ยวกับเนื้อหาวิชา
            </a>
          </div>
        </div>

        <div id="social">
          <h2>ติดต่อเรา</h2>
          <p>ผ่านช่องทางต่าง ๆ </p>
          <div className="center-point">
            <a href="https://www.line.me/th/" target="_blank">
              <img
                className="button-icon"
                role="presentation"
                aria-hidden="true"
                src={lineLogo}
              />
              ไลน์
            </a>

            <a href="https://www.facebook.com/" target="_blank">
              <img
                className="button-icon"
                role="presentation"
                aria-hidden="true"
                src={facebookLogo}
              />
              เฟสบุ๊ค
            </a>

            <a
              href="https://www.svgrepo.com/show/452133/whatsapp.svg"
              target="_blank"
            >
              <img
                className="button-icon"
                role="presentation"
                aria-hidden="true"
                src={whatsAppLogo}
              />
              WhatsApp
            </a>

            <a href="https://www.facebook.com/" target="_blank">
              <img
                className="button-icon"
                role="presentation"
                aria-hidden="true"
                src={telephoneLogo}
              />
              โทรศัพท์
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-section">
          <img
            className="logo"
            role="presentation"
            aria-hidden="true"
            src={yourLogo}
          />

          <p>
            โลโก้ส่วนตัวพร้อมชื่อบริษัท---- © 2026 ลิขสิทธิ์ถูกต้อง
            หมายเลขทะเบียนการค้าอิเล็กทรอนิกส์ : 01234567890123
          </p>
        </div>
      </footer>
    </>
  );
}
