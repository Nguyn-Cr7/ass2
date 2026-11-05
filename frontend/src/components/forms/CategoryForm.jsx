// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';

// Cấu trúc mặc định cho form tạo danh mục mới
const EMPTY_CATEGORY = { categoryName: '', categoryDescription: '', parentCategoryId: '', active: true };

/**
 * Form nhập liệu thêm mới hoặc cập nhật thông tin danh mục bài viết.
 */
export default function CategoryForm({ initialValue, categories, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(EMPTY_CATEGORY);

  // Nạp dữ liệu cũ vào form nếu đang ở chế độ chỉnh sửa
  useEffect(() => {
    setForm(initialValue ? {
      categoryName: initialValue.categoryName || '',
      categoryDescription: initialValue.categoryDescription || '',
      parentCategoryId: initialValue.parentCategoryId ?? '',
      active: initialValue.active ?? true,
    } : EMPTY_CATEGORY);
  }, [initialValue]);

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Xử lý khi nhấn nút Lưu danh mục
  function submit(event) {
    event.preventDefault();
    onSubmit({
      categoryName: form.categoryName.trim(),
      categoryDescription: form.categoryDescription.trim(),
      parentCategoryId: form.parentCategoryId === '' ? null : Number(form.parentCategoryId),
      active: Boolean(form.active),
    });
  }

  return (
    <form onSubmit={submit}>
      <label>Tên danh mục *
        <input required maxLength={100} value={form.categoryName} onChange={(e) => update('categoryName', e.target.value)} />
      </label>
      <label>Mô tả *
        <textarea required maxLength={250} rows={3} value={form.categoryDescription} onChange={(e) => update('categoryDescription', e.target.value)} />
      </label>
      {/* Chọn danh mục cha (loại trừ chính danh mục đang chỉnh sửa) */}
      <label>Danh mục cha
        <select value={form.parentCategoryId} onChange={(e) => update('parentCategoryId', e.target.value)}>
          <option value="">-- Không có --</option>
          {categories.filter((category) => category.categoryId !== initialValue?.categoryId).map((category) => (
            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
          ))}
        </select>
      </label>
      <label>Trạng thái
        <select value={String(form.active)} onChange={(e) => update('active', e.target.value === 'true')}>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </label>
      <div className="modalactions">
        <button type="button" className="secondary" onClick={onCancel}>Hủy</button>
        <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</button>
      </div>
    </form>
  );
}
