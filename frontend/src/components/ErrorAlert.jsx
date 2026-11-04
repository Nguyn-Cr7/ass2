// Author: Khôi Nguyên
import React from 'react';

export default function ErrorAlert({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="error banner" role="alert">
      <span>{message}</span>
      <button type="button" className="secondary" onClick={onClose}>Đóng</button>
    </div>
  );
}
