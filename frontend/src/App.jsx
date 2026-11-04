// Author: Khôi Nguyên
import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import RequireAuth from './components/RequireAuth';
import RequireRole from './components/RequireRole';
import LoginPage from './pages/LoginPage';
import PublicHomePage from './pages/PublicHomePage';
import NewsPage from './pages/NewsPage';
import CategoriesPage from './pages/CategoriesPage';
import AccountsPage from './pages/AccountsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import authService from './services/authService';
import newsService from './services/newsService';
import errorMessage from './utils/errorMessage';

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => authService.getSession());
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [publicNews, setPublicNews] = useState([]);
  const [publicNewsLoading, setPublicNewsLoading] = useState(true);
  const [publicNewsError, setPublicNewsError] = useState('');

  const isAdmin = Number(user?.accountRole) === 1;
  const homePath = user ? (isAdmin ? '/accounts' : '/news') : '/';

  const loadPublicNews = useCallback(async () => {
    setPublicNewsLoading(true);
    setPublicNewsError('');
    try {
      const result = await newsService.getPublic();
      if (!Array.isArray(result)) {
        setPublicNews([]);
        setPublicNewsError('API /api/news/public đã phản hồi nhưng dữ liệu không phải một mảng JSON. Hãy kiểm tra response trong Postman.');
        return;
      }
      setPublicNews(result);
    } catch (loadError) {
      setPublicNews([]);
      console.error('Không tải được tin công khai từ API:', loadError);
      if (loadError?.response) {
        setPublicNewsError(`Backend trả về HTTP ${loadError.response.status}: ${errorMessage(loadError, 'Yêu cầu tải tin công khai thất bại.')}`);
      } else if (loadError?.request) {
        setPublicNewsError('Không nhận được phản hồi từ http://localhost:8080/api/news/public. Hãy kiểm tra Backend có đang chạy, CORS và cấu hình kết nối SQL Server hay không. Chi tiết: ' + (loadError.message || 'Không có phản hồi từ máy chủ.'));
      } else {
        setPublicNewsError(errorMessage(loadError, 'Không thể tải tin công khai.'));
      }
    } finally {
      setPublicNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPublicNews();
  }, [loadPublicNews]);

  const handleLogin = useCallback(async (credentials) => {
    setError('');
    try {
      const loggedInUser = await authService.login(credentials);
      authService.saveSession(loggedInUser);
      setUser(loggedInUser);
      setSearch('');
      await loadPublicNews();
      return loggedInUser;
    } catch (loginError) {
      setError(errorMessage(loginError, 'Không thể đăng nhập. Vui lòng kiểm tra email và mật khẩu.'));
      return null;
    }
  }, [loadPublicNews]);

  const handleLogout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    setSearch('');
    setError('');
    navigate('/', { replace: true });
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
        element={<PublicHomePage
          user={user}
          homePath={homePath}
          publicNews={publicNews}
          publicNewsLoading={publicNewsLoading}
          publicNewsError={publicNewsError}
          onRetryPublicNews={loadPublicNews}
        />}
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
