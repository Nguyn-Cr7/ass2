// Author: Khôi Nguyên
import React from 'react';

export default function Modal({ title, onClose, children, size = 'normal' }) {
  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal ${size === 'wide' ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modalhead">
          <h2>{title}</h2>
          <button type="button" className="secondary" aria-label="Đóng hộp thoại" onClick={onClose}>✕</button>
        </div>
        {children}
      </section>
    </div>
  );
}
