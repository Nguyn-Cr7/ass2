// Author: Khôi Nguyên
import apiClient from './apiClient';

const tagService = {
  async getAll() {
    const response = await apiClient.get('/tags');
    return response.data;
  },
};

export default tagService;
