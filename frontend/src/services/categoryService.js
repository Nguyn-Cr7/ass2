// Author: Khôi Nguyên
import apiClient from './apiClient';

/**
 * Service gọi API quản lý danh mục (/api/categories).
 */
const categoryService = {
  // Lấy danh sách danh mục (hỗ trợ tìm kiếm theo tên)
  async getAll(search = '') {
    const response = await apiClient.get('/categories', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },

  // Tạo mới danh mục
  async create(payload) {
    const response = await apiClient.post('/categories', payload);
    return response.data;
  },

  // Cập nhật danh mục theo ID
  async update(id, payload) {
    const response = await apiClient.put(`/categories/${id}`, payload);
    return response.data;
  },

  // Xóa danh mục theo ID
  async remove(id) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
