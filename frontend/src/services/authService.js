// Author: Khôi Nguyên
import apiClient from './apiClient';

const SESSION_KEY = 'funews-user';

const authService = {
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  async updateProfile(accountId, profile) {
    const response = await apiClient.put(`/auth/profile/${accountId}`, profile);
    return response.data;
  },
  getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },
  saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },
};

export default authService;
