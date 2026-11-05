// Author: Khôi Nguyên
import apiClient from './apiClient';

/**
 * Service gọi API danh sách thẻ tag (/api/tags).
 */
const tagService = {
  // Lấy toàn bộ danh sách thẻ tag
  async getAll() {
    const response = await apiClient.get('/tags');
    return response.data;
  },
};

export default tagService;
