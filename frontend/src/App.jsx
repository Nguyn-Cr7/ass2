// Author: Khôi Nguyên
import React, { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import RequireAuth from './components/RequireAuth';
import RequireRole from './components/RequireRole';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import CategoriesPage from './pages/CategoriesPage';
import AccountsPage from './pages/AccountsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import authService from './services/authService';
import errorMessage from './utils/errorMessage';

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => authService.getSession());
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const isAdmin = Number(user?.accountRole) === 1;
  const homePath = user ? (isAdmin ? '/accounts' : '/news') : '/login';

  const handleLogin = useCallback(async (credentials) => {
    setError('');
    try {
      const loggedInUser = await authService.login(credentials);
      authService.saveSession(loggedInUser);
      setUser(loggedInUser);
      setSearch('');
      return loggedInUser;
    } catch (loginError) {
      setError(errorMessage(loginError, 'Không thể đăng nhập. Vui lòng kiểm tra email và mật khẩu.'));
      return null;
    }
  }, []);

  const handleLogout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    setSearch('');
    setError('');
    navigate('/login', { replace: true });
  }, [navigate]);

  const saveProfile = useCallback(async (payload) => {
    try {
      const updatedUser = await authService.updateProfile(user.accountId, payload);
      authService.saveSession(updatedUser);
      setUser(updatedUser);
      return updatedUser;
    } catch (profileError) {
      throw new Error(errorMessage(profileError, 'Không thể cập nhật hồ sơ.'));
    }
  }, [user]);

  const clearError = useCallback((value) => setError(value), []);
  const clearSearch = useCallback((value) => setSearch(value), []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? homePath : '/login'} replace />}
      />

      <Route
        path="/login"
        element={user
          ? <Navigate to={homePath} replace />
          : <LoginPage onLogin={handleLogin} error={error} />}
      />

      <Route element={<RequireAuth user={user} />}>
        <Route element={
          <AppLayout
            user={user}
            onLogout={handleLogout}
            error={error}
            setError={clearError}
            search={search}
            setSearch={clearSearch}
          />
        }>
          <Route path="news" element={<NewsPage user={user} search={search} onError={setError} />} />
          <Route path="profile" element={<ProfilePage user={user} onSave={saveProfile} />} />

          <Route element={<RequireRole user={user} allowedRole={1} redirectTo="/news" />}>
            <Route path="accounts" element={<AccountsPage search={search} onError={setError} />} />
          </Route>

          <Route element={<RequireRole user={user} allowedRole={2} redirectTo="/news" />}>
            <Route path="categories" element={<CategoriesPage search={search} onError={setError} />} />
            <Route path="history" element={<HistoryPage user={user} search={search} onError={setError} />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
