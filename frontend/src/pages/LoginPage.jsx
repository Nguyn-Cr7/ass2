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

  return (
    <main className="login-page">
      <header className="login-page-header">
        <Link className="public-brand" to="/" aria-label="Quay lại trang tin tức">
          <span className="public-brand-mark">FU</span>
          <span className="public-brand-copy">
            <strong>FU News Management</strong>
            <small>Tin tức và thông báo mới nhất</small>
          </span>
        </Link>
        <Link className="button-link secondary" to="/">← Tin tức công khai</Link>
      </header>
      <section className="login">
        <form className="panel" onSubmit={submit}>
          <p className="eyebrow">FUNewsManagementSystem</p>
          <h1>Đăng nhập</h1>
          <p>Đăng nhập bằng email và mật khẩu tài khoản đã được lưu trong SQL Server.</p>
          <label>Email
            <input autoComplete="username" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>Mật khẩu
            <input autoComplete="current-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="error" role="alert">{error}</p>}
          <button type="submit" disabled={submitting}>{submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
          <small>Role 1: Admin · Role 2: Staff</small>
        </form>
      </section>
      <footer>FUNewsManagementSystem · Assignment 02 · Author: Khôi Nguyên</footer>
    </main>
  );
}
