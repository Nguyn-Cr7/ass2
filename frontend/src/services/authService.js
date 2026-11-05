// Author: Khôi Nguyên
import apiClient from './apiClient';

// Key lưu trữ phiên đăng nhập người dùng trong localStorage
const SESSION_KEY = 'funews-user';

/**
 * Service quản lý xác thực đăng nhập và lưu trữ phiên làm việc của người dùng.
 */
const authService = {
  // Gửi email & password lên backend để đăng nhập
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Cập nhật thông tin hồ sơ cá nhân
  async updateProfile(accountId, profile) {
    const response = await apiClient.put(`/auth/profile/${accountId}`, profile);
    return response.data;
  },

  // Đọc thông tin người dùng từ localStorage
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },

  // Lưu thông tin người dùng vào localStorage sau khi đăng nhập thành công
  saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
};

export default authService;
