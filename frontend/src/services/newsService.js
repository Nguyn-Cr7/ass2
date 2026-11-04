// Author: Khôi Nguyên
import apiClient from './apiClient';

const newsService = {
  async getPublic() {
    const response = await apiClient.get('/news/public');
    return response.data;
  },
  async getAll(search = '') {
    const response = await apiClient.get('/news', { params: search.trim() ? { search: search.trim() } : {} });
    return response.data;
  },
  async getById(id) {
    const response = await apiClient.get(`/news/${encodeURIComponent(id)}`);
    return response.data;
  },
  async getHistory(accountId) {
    const response = await apiClient.get(`/news/history/${accountId}`);
    return response.data;
  },
  async create(payload) {
    const response = await apiClient.post('/news', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await apiClient.put(`/news/${encodeURIComponent(id)}`, payload);
    return response.data;
  },
  async remove(id) {
    const response = await apiClient.delete(`/news/${encodeURIComponent(id)}`);
    return response.data;
  },
};

export default newsService;
