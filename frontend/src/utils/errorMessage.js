// Author: Khôi Nguyên

/**
 * Trích xuất và định dạng thông báo lỗi từ phản hồi HTTP của Axios để hiển thị cho người dùng.
 */
export default function errorMessage(error, fallback = 'Đã xảy ra lỗi. Vui lòng thử lại.') {
  const data = error?.response?.data;
  // Xử lý lỗi validation nhiều trường
  if (data?.error && data?.fields) {
    return `${data.error}: ${Object.entries(data.fields).map(([field, message]) => `${field}: ${message}`).join(', ')}`;
  }
  return data?.error || data?.message || error?.message || fallback;
}
