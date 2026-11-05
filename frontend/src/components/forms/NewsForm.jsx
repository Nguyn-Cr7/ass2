// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';

// Dữ liệu rỗng ban đầu khi tạo bài viết mới
const INITIAL_NEWS = {
  newsTitle: '', headline: '', newsContent: '', newsSource: '',
  categoryId: '', newsStatus: true, tags: [],
};

/**
 * Form nhập liệu soạn thảo bài viết mới hoặc chỉnh sửa bài viết đã có.
 */
export default function NewsForm({ initialValue, categories, availableTags, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(INITIAL_NEWS);
  const isEditing = Boolean(initialValue?.newsArticleId);

  // Điền dữ liệu bài viết cũ vào form khi mở chế độ sửa
  useEffect(() => {
    setForm(initialValue ? {
      newsTitle: initialValue.newsTitle || '',
      headline: initialValue.headline || '',
      newsContent: initialValue.newsContent || '',
      newsSource: initialValue.newsSource || '',
      categoryId: initialValue.category?.categoryId ?? '',
      newsStatus: initialValue.newsStatus ?? true,
      tags: (initialValue.tags || []).map((tag) => String(tag.tagId)),
    } : INITIAL_NEWS);
  }, [initialValue]);

  function setField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  // Ràng buộc nghiệp vụ: Chỉ cho phép chọn danh mục Active khi tạo/sửa bài viết.
  // Nếu bài viết cũ thuộc danh mục Inactive thì vẫn giữ lại để không bị ép đổi.
  const currentCategoryId = initialValue?.category?.categoryId;
  const selectableCategories = categories.filter((category) =>
    Boolean(category.active) || (isEditing && String(category.categoryId) === String(currentCategoryId))
  );

  // Xử lý gửi dữ liệu lên component cha để lưu
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      newsTitle: form.newsTitle.trim(),
      headline: form.headline.trim(),
      newsContent: form.newsContent,
      newsSource: form.newsSource.trim(),
      category: form.categoryId ? { categoryId: Number(form.categoryId) } : null,
      newsStatus: Boolean(form.newsStatus),
      tags: form.tags.map((tagId) => ({ tagId: Number(tagId) })),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Tiêu đề
        <input maxLength={400} value={form.newsTitle} onChange={(e) => setField('newsTitle', e.target.value)} />
      </label>
      <label>Headline *
        <input required maxLength={150} value={form.headline} onChange={(e) => setField('headline', e.target.value)} />
      </label>
      <label>Nội dung
        <textarea maxLength={4000} rows={5} value={form.newsContent} onChange={(e) => setField('newsContent', e.target.value)} />
      </label>
      <label>Nguồn tin
        <input maxLength={400} value={form.newsSource} onChange={(e) => setField('newsSource', e.target.value)} />
      </label>
      <label>Danh mục *
        <select required value={form.categoryId} onChange={(e) => setField('categoryId', e.target.value)}>
          <option value="">-- Chọn danh mục --</option>
          {selectableCategories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName} {!category.active ? '(Inactive)' : ''}
            </option>
          ))}
        </select>
      </label>
      <label>Trạng thái
        <select value={String(form.newsStatus)} onChange={(e) => setField('newsStatus', e.target.value === 'true')}>
          <option value="true">Đang hoạt động (Active)</option>
          <option value="false">Ẩn (Inactive)</option>
        </select>
      </label>
      <label>Thẻ Tag (giữ Ctrl / Command để chọn nhiều)
        <select
          multiple
          value={form.tags}
          onChange={(e) => setField('tags', Array.from(e.target.selectedOptions, (item) => item.value))}
        >
          {availableTags.map((tag) => (
            <option key={tag.tagId} value={tag.tagId}>{tag.tagName}</option>
          ))}
        </select>
      </label>
      <div className="modalactions">
        <button type="button" className="secondary" onClick={onCancel}>Hủy</button>
        <button type="submit" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu'}</button>
      </div>
    </form>
  );
}
