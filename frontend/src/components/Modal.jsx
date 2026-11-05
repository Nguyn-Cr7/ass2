// Author: Khôi Nguyên
import React from 'react';

/**
 * Component hộp thoại Modal bật lên dạng popup để hiển thị form thêm mới / chỉnh sửa.
 */
export default function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className={`modal ${wide ? 'modal-wide' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="modalhead">
          <h2>{title}</h2>
          <button type="button" className="secondary" onClick={onClose} aria-label="Đóng hộp thoại">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
