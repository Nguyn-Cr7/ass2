// Author: Khôi Nguyên
import apiClient from './apiClient';

const accountService = {
  async getAll(search = '') {
    const response = await apiClient.get('/accounts', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },
  async create(payload) {
    const response = await apiClient.post('/accounts', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await apiClient.put(`/accounts/${id}`, payload);
    return response.data;
  },
  async remove(id) {
    const response = await apiClient.delete(`/accounts/${id}`);
    return response.data;
  },
};

export default accountService;
