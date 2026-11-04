// Author: Khôi Nguyên
import React, { useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';
import SearchToolbar from './SearchToolbar';

const SEARCH_PATHS = ['/news', '/categories', '/accounts', '/history'];

export default function AppLayout({ user, onLogout, error, setError, search, setSearch }) {
  const location = useLocation();
  const showSearch = SEARCH_PATHS.includes(location.pathname);
  const isAdmin = Number(user?.accountRole) === 1;

  useEffect(() => {
    setSearch('');
    setError('');
  }, [location.pathname, setSearch, setError]);

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/accounts':
        return { title: 'Quản lý tài khoản', sub: 'Danh sách và phân quyền tài khoản hệ thống' };
      case '/news':
        return { title: 'Quản lý tin tức & bài viết', sub: 'Soạn thảo, cập nhật và quản lý bài đăng' };
      case '/categories':
        return { title: 'Quản lý danh mục', sub: 'Phân loại chủ đề và trạng thái danh mục tin tức' };
      case '/history':
        return { title: 'Lịch sử bài viết', sub: 'Các bài viết do chính bạn tạo trong hệ thống' };
      case '/profile':
        return { title: 'Hồ sơ cá nhân', sub: 'Thông tin tài khoản và cập nhật mật khẩu' };
      default:
        return { title: 'Bảng điều khiển', sub: 'Hệ thống quản lý tin tức FUNews' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="dashboard-container">
      {/* SIDEBAR BÊN TRÁI */}
      <aside className="dashboard-sidebar">
        <Link to="/" className="sidebar-brand" style={{ textDecoration: 'none' }} title="Quay lại trang chủ tin tức">
          <div className="brand-logo-badge">FN</div>
          <div className="brand-text">
            <h2>FUNews</h2>
            <span>Management System</span>
          </div>
        </Link>

        <div className="sidebar-user-card">
          <div className="user-avatar">
            {(user?.accountName || user?.accountEmail || 'U')[0].toUpperCase()}
          </div>
          <div className="user-info">
            <strong className="user-name">{user?.accountName || 'Người dùng'}</strong>
            <span className={`user-badge ${isAdmin ? 'badge-admin' : 'badge-staff'}`}>
              {isAdmin ? 'Quản trị viên (Admin)' : 'Nhân viên (Staff)'}
            </span>
          </div>
        </div>

        <div className="sidebar-menu-section">
          <span className="sidebar-section-title">MENU CHÍNH</span>
          <nav className="sidebar-nav">
            {isAdmin ? (
              <>
                <NavLink to="/accounts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Quản lý tài khoản</span>
                </NavLink>
                <NavLink to="/news" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Quản lý tin tức</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/news" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Quản lý tin tức</span>
                </NavLink>
                <NavLink to="/categories" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span>Danh mục tin tức</span>
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Lịch sử bài viết</span>
                </NavLink>
              </>
            )}

            <div className="sidebar-divider" />
            <span className="sidebar-section-title">HỆ THỐNG & CÁ NHÂN</span>

            <NavLink to="/" className="sidebar-link">
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Xem trang chủ tin tức</span>
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Hồ sơ cá nhân</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button type="button" className="btn-logout" onClick={onLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Đăng xuất</span>
          </button>
          <div className="sidebar-author-text">
            <span>Assignment 02 · <strong>Khôi Nguyên</strong></span>
          </div>
        </div>
      </aside>

      {/* KHU VỰC CHÍNH */}
      <div className="dashboard-main">
        {/* TOPBAR */}
        <header className="dashboard-topbar">
          <div className="topbar-title-wrap">
            <h1 className="page-heading-title">{pageInfo.title}</h1>
            <span className="page-subtitle">{pageInfo.sub}</span>
          </div>

          <div className="topbar-right">
            {showSearch && (
              <div className="topbar-search-wrap">
                <SearchToolbar value={search} onChange={setSearch} canCreate={false} />
                {search && (
                  <button type="button" className="btn-clear-search" onClick={() => setSearch('')} title="Xóa tìm kiếm">
                    ✕
                  </button>
                )}
              </div>
            )}
            <div className="topbar-user-pill">
              <span className="topbar-user-email">{user?.accountEmail}</span>
            </div>
          </div>
        </header>

        {/* NỘI DUNG TRANG */}
        <main className="dashboard-content">
          <ErrorAlert message={error} onClose={() => setError('')} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
