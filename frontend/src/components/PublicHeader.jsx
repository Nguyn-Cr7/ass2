// Author: Khôi Nguyên
import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicHeader({ user = null, homePath = '/' }) {
  return (
    <header className="public-header">
      <Link className="public-brand" to="/" aria-label="FU News Management - Trang chủ">
        <span className="public-brand-mark">FU</span>
        <span className="public-brand-copy">
          <strong>FU News Management</strong>
          <small>Tin tức và thông báo mới nhất</small>
        </span>
      </Link>
      {user ? (
        <Link className="button-link public-login-button" to={homePath}>Vào trang quản lý</Link>
      ) : (
        <Link className="button-link public-login-button" to="/login">Đăng nhập</Link>
      )}
    </header>
  );
}
