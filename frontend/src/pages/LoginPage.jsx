// Author: Khôi Nguyên
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin, error }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const loggedInUser = await onLogin({ email: email.trim(), password });
      if (loggedInUser) {
        navigate(Number(loggedInUser.accountRole) === 1 ? '/accounts' : '/news', { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const fillQuick = (quickEmail, quickPassword) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
  };

  return (
    <div className="login-screen">
      {/* NÚT QUAY LẠI TRANG CHỦ */}
      <div className="login-top-bar">
        <Link to="/" className="btn-back-home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Về trang chủ</span>
        </Link>
      </div>

      <div className="login-card-box">
        <div className="login-brand-header">
          <div className="login-brand-icon">FN</div>
          <h1>FU News Management</h1>
          <p>Hệ thống quản lý tin tức nội bộ</p>
        </div>

        <form className="login-form-body" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="login-email">Địa chỉ Email</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="login-email"
                autoComplete="username"
                type="email"
                placeholder="Nhập email của bạn..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Mật khẩu</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="login-password"
                autoComplete="current-password"
                type="password"
                placeholder="Nhập mật khẩu..."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="login-error-alert" role="alert">{error}</div>}

          <button type="submit" className="btn-login-submit" disabled={submitting}>
            {submitting ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}
          </button>

          <div className="login-quick-hints">
            <span className="hints-title">Tài khoản thử nghiệm:</span>
            <div className="hints-buttons">
              <button
                type="button"
                className="btn-quick-fill admin-hint"
                onClick={() => fillQuick('SteveParis@FUNewsManagement.org', '@1')}
              >
                👑 <strong>Admin</strong> (Steve Paris)
              </button>
              <button
                type="button"
                className="btn-quick-fill staff-hint"
                onClick={() => fillQuick('EmmaWilliam@FUNewsManagement.org', '@1')}
              >
                ✍️ <strong>Staff</strong> (Emma William)
              </button>
            </div>
          </div>
        </form>

        <footer className="login-card-footer">
          <span>FUNewsManagementSystem · Assignment 02 · Author: <strong>Khôi Nguyên</strong></span>
        </footer>
      </div>
    </div>
  );
}
