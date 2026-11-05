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

/**
 * Component gốc quản lý State đăng nhập, tải dữ liệu công khai và cấu hình định tuyến (Routes).
 */
export default function App() {
  const navigate = useNavigate();

  // State lưu thông tin phiên đăng nhập của người dùng
  const [user, setUser] = useState(() => authService.getSession());
  // State từ khóa tìm kiếm dùng chung cho các màn hình quản lý
  const [search, setSearch] = useState('');
  // State thông báo lỗi hệ thống hiển thị lên thanh banner
  const [error, setError] = useState('');
  // State danh sách và trạng thái tải tin tức công khai cho trang chủ
  const [publicNews, setPublicNews] = useState([]);
  const [publicNewsLoading, setPublicNewsLoading] = useState(true);
  const [publicNewsError, setPublicNewsError] = useState('');

  // Xác định người dùng có phải là Admin (Role = 1) hay không
  const isAdmin = Number(user?.accountRole) === 1;
  // Đường dẫn mặc định sau khi đăng nhập: Admin -> /accounts, Staff -> /news
  const homePath = user ? (isAdmin ? '/accounts' : '/news') : '/login';

  // Hàm tải danh sách tin tức công khai từ API backend (/api/news/public)
  const loadPublicNews = useCallback(async () => {
    setPublicNewsLoading(true);
    setPublicNewsError('');
    try {
      const result = await newsService.getPublic();
      if (!Array.isArray(result)) {
        setPublicNews([]);
        setPublicNewsError('Phản hồi không hợp lệ từ máy chủ.');
        return;
      }
      setPublicNews(result);
    } catch (loadError) {
      setPublicNews([]);
      setPublicNewsError(errorMessage(loadError, 'Không thể tải tin tức công khai từ API.'));
    } finally {
      setPublicNewsLoading(false);
    }
  }, []);

  // Tự động tải tin tức công khai khi ứng dụng khởi chạy
  useEffect(() => {
    loadPublicNews();
  }, [loadPublicNews]);

  // Xử lý đăng nhập: gọi API, lưu phiên vào localStorage và cập nhật state
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

  // Xử lý đăng xuất: xóa phiên đăng nhập và điều hướng về trang chủ
  const handleLogout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    setSearch('');
    setError('');
    navigate('/', { replace: true });
  }, [navigate]);

  // Cập nhật thông tin hồ sơ cá nhân và đồng bộ lại phiên đăng nhập
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
      {/* Trang chủ công khai: dành cho mọi người xem tin tức */}
      <Route
        path="/"
        element={
          <PublicHomePage
            user={user}
            homePath={isAdmin ? '/accounts' : '/news'}
            publicNews={publicNews}
            publicNewsLoading={publicNewsLoading}
            publicNewsError={publicNewsError}
            onRetryPublicNews={loadPublicNews}
          />
        }
      />

      {/* Trang Đăng nhập: nếu đã đăng nhập thì tự chuyển vào Dashboard */}
      <Route
        path="/login"
        element={user
          ? <Navigate to={isAdmin ? '/accounts' : '/news'} replace />
          : <LoginPage onLogin={handleLogin} error={error} />}
      />

      {/* Khu vực yêu cầu Đăng nhập (bảo vệ bởi RequireAuth) */}
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
          {/* Các trang dùng chung */}
          <Route path="news" element={<NewsPage user={user} search={search} onError={setError} />} />
          <Route path="profile" element={<ProfilePage user={user} onSave={saveProfile} />} />

          {/* Trang chỉ dành riêng cho Admin (Role 1) */}
          <Route element={<RequireRole user={user} allowedRole={1} redirectTo="/news" />}>
            <Route path="accounts" element={<AccountsPage search={search} onError={setError} />} />
          </Route>

          {/* Trang chỉ dành riêng cho Staff (Role 2) */}
          <Route element={<RequireRole user={user} allowedRole={2} redirectTo="/news" />}>
            <Route path="categories" element={<CategoriesPage search={search} onError={setError} />} />
            <Route path="history" element={<HistoryPage user={user} search={search} onError={setError} />} />
          </Route>
        </Route>
      </Route>

      {/* Điều hướng mặc định nếu không khớp route nào */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
