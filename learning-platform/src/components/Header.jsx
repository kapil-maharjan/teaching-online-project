import yourLogo from "../assets/your-logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header>
        <div className="left-section">
          <img className="logo" data-testid="header-logo" src={yourLogo} />
          <p className="company-name">โลโก้กับชื่อบริษัท</p>
        </div>

        <div className="right-section">
          <Link to="/">หน้าหลัก</Link>
          <Link to="/about-us">เกี่ยวกับเรา</Link>
          <Link to="/teacher-signup">สมัครเป็นครู</Link>
          <Link to="/admin-login">Admin</Link>
          <Link to="/contact-us">ติดต่อเรา</Link>
        </div>

        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li>
            <Link to="/about-us">เกี่ยวกับเรา</Link>
          </li>
          <li>
            <Link to="/teacher-signup">สมัครเป็นครู</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin</Link>
          </li>
          <li>
            <Link to="/contact-us">ติดต่อเรา</Link>
          </li>
        </ul>
      </header>
    </>
  );
}
