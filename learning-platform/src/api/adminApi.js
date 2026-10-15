const API_BASE = 'http://localhost:5000/api';

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'การเข้าสู่ระบบล้มเหลว');
  }
  return data; // { message, token }
}

export async function fetchTeachers() {
  const token = localStorage.getItem('adminToken');

  const res = await fetch(`${API_BASE}/admin/teachers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'ไม่สามารถโหลดข้อมูลครูได้');
  }
  return data.teachers;
}