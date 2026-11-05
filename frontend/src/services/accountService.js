// Author: Khôi Nguyên
import apiClient from './apiClient';

/**
 * Service gọi API quản lý tài khoản (/api/accounts).
 */
const accountService = {
  // Lấy danh sách tài khoản (hỗ trợ lọc từ khóa tìm kiếm)
  async getAll(search = '') {
    const response = await apiClient.get('/accounts', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },

  // Tạo mới tài khoản
  async create(payload) {
    const response = await apiClient.post('/accounts', payload);
    return response.data;
  },

  // Cập nhật thông tin tài khoản
  async update(id, payload) {
    const response = await apiClient.put(`/accounts/${id}`, payload);
    return response.data;
  },

  // Xóa tài khoản theo ID
  async remove(id) {
    const response = await apiClient.delete(`/accounts/${id}`);
    return response.data;
  },
};

export default accountService;
