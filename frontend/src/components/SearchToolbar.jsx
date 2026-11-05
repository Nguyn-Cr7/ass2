// Author: Khôi Nguyên
import React from 'react';

/**
 * SearchToolbar: Thanh tìm kiếm dùng chung kèm nút Thêm mới (nếu có quyền)
 * - value, onChange: Quản lý từ khóa tìm kiếm
 * - canCreate, onCreate, createLabel: Điều kiện hiển thị và xử lý khi click nút thêm mới
 */
export default function SearchToolbar({ value, onChange, onCreate, canCreate = false, createLabel = '+ Thêm mới' }) {
  return (
    <div className="search-bar-box">
      <div className="search-input-wrapper">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        {/* Ô nhập từ khóa tìm kiếm */}
        <input
          aria-label="Tìm kiếm"
          type="text"
          placeholder="Tìm kiếm theo từ khóa..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {/* Nút thêm mới hiển thị tùy theo trang và quyền của người dùng */}
      {canCreate && (
        <button type="button" className="btn-primary" onClick={onCreate}>
          {createLabel}
        </button>
      )}
    </div>
  );
}
