// Author: Khôi Nguyên
import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicHeader({ user = null, homePath = '/news' }) {
  return (
    <header className="public-navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" aria-label="FUNews - Trang chủ">
          <div className="brand-logo-badge">FN</div>
          <div className="brand-text">
            <h2>FUNews</h2>
            <span>Cổng thông tin tin tức</span>
          </div>
        </Link>

        <div className="navbar-actions">
          {user ? (
            <Link className="btn-navbar-login" to={homePath}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>Vào bảng điều khiển</span>
            </Link>
          ) : (
            <Link className="btn-navbar-login" to="/login">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Đăng nhập hệ thống</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
