// Author: Khôi Nguyên
export default function errorMessage(error, fallback = 'Đã xảy ra lỗi. Vui lòng thử lại.') {
  const data = error?.response?.data;
  if (data?.error && data?.fields) {
    return `${data.error}: ${Object.entries(data.fields).map(([field, message]) => `${field}: ${message}`).join(', ')}`;
  }
  return data?.error || data?.message || error?.message || fallback;
}
