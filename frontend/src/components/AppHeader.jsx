// Author: Khôi Nguyên
import React from 'react';
import { Link } from 'react-router-dom';

export default function AppHeader({ user, onLogout }) {
  const isAdmin = Number(user?.accountRole) === 1;
  return (
    <header className="app-header">
      <div>
        <h1>FU News Management</h1>
        <p>Xin chào {user?.accountName || user?.accountEmail} · {isAdmin ? 'Admin' : 'Staff'}</p>
      </div>
      <div className="header-actions">
        <Link className="button-link secondary" to="/profile">Hồ sơ cá nhân</Link>
        <button type="button" className="secondary" onClick={onLogout}>Đăng xuất</button>
      </div>
    </header>
  );
}
