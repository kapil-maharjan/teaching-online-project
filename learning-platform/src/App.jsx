import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { AboutUs } from './pages/AboutUs';
import { TeacherSignUp } from './pages/TeacherSignUp';
import { ContactUs } from './pages/ContactUs';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashBoard';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/teacher-signup" element={<TeacherSignUp />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/contact-us" element={<ContactUs />} />
    </Routes>
  );
}
export default App
