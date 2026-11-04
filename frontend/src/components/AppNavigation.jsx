// Author: Khôi Nguyên
import React from 'react';
import { NavLink } from 'react-router-dom';

const ADMIN_LINKS = [
  { to: '/accounts', label: 'Quản lý tài khoản' },
  { to: '/news', label: 'Quản lý bài viết' },
];

const STAFF_LINKS = [
  { to: '/news', label: 'Quản lý bài viết' },
  { to: '/categories', label: 'Danh mục' },
  { to: '/history', label: 'Lịch sử bài viết' },
];

export default function AppNavigation({ role }) {
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
