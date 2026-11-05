// Author: Khôi Nguyên
import React from 'react';

/**
 * Component hiển thị thanh thông báo lỗi màu đỏ có nút đóng.
 */
export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="banner error" role="alert">
      <span>{message}</span>
      {onClose && (
        <button type="button" className="secondary" onClick={onClose} aria-label="Đóng cảnh báo">
          Đóng
        </button>
      )}
    </div>
  );
}
