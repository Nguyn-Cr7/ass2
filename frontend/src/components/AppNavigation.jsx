// Author: Khôi Nguyên
import React from 'react';
import { NavLink } from 'react-router-dom';

// Danh sách đường dẫn menu dành cho Admin (role 1)
const ADMIN_LINKS = [
  { to: '/accounts', label: 'Quản lý tài khoản' },
  { to: '/news', label: 'Quản lý bài viết' },
];

// Danh sách đường dẫn menu dành cho Staff (role 2)
const STAFF_LINKS = [
  { to: '/news', label: 'Quản lý bài viết' },
  { to: '/categories', label: 'Danh mục' },
  { to: '/history', label: 'Lịch sử bài viết' },
];

/**
 * AppNavigation: Thanh liên kết điều hướng theo quyền hạn người dùng
 */
export default function AppNavigation({ role }) {
  // Lựa chọn danh sách liên kết theo vai trò (1: Admin, khác: Staff)
  const links = Number(role) === 1 ? ADMIN_LINKS : STAFF_LINKS;
  return (
    <nav aria-label="Điều hướng chính">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'active' : ''}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
