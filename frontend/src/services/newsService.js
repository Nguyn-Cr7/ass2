// Author: Khôi Nguyên
import apiClient from './apiClient';

/**
 * Service gọi API quản lý bài viết tin tức (/api/news).
 */
const newsService = {
  // Lấy danh sách tin tức công khai đang Active
  async getPublic() {
    const response = await apiClient.get('/news/public');
    return response.data;
  },

  // Lấy toàn bộ bài viết (hỗ trợ tìm kiếm từ khóa)
  async getAll(search = '') {
    const response = await apiClient.get('/news', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },

  // Lấy chi tiết bài viết theo ID
  async getById(id) {
    const response = await apiClient.get(`/news/${encodeURIComponent(id)}`);
    return response.data;
  },

  // Lấy lịch sử bài viết do tài khoản cụ thể tạo ra
  async getHistory(accountId) {
    const response = await apiClient.get(`/news/history/${accountId}`);
    return response.data;
  },

  // Tạo mới bài viết
  async create(payload) {
    const response = await apiClient.post('/news', payload);
    return response.data;
  },

  // Cập nhật bài viết theo ID
  async update(id, payload) {
    const response = await apiClient.put(`/news/${encodeURIComponent(id)}`, payload);
    return response.data;
  },

  // Xóa bài viết theo ID
  async remove(id) {
    const response = await apiClient.delete(`/news/${encodeURIComponent(id)}`);
    return response.data;
  },
};

export default newsService;
