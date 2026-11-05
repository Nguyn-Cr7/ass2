// Author: Khôi Nguyên
import axios from 'axios';

/**
 * Cấu hình Axios instance dùng chung để gọi HTTP Request tới Backend (Port 8080).
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;
