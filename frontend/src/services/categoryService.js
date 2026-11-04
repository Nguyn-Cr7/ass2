// Author: Khôi Nguyên
import apiClient from './apiClient';

const categoryService = {
  async getAll(search = '') {
    const response = await apiClient.get('/categories', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },
  async create(payload) {
    const response = await apiClient.post('/categories', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await apiClient.put(`/categories/${id}`, payload);
    return response.data;
  },
  async remove(id) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
