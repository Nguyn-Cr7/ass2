// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';

const INITIAL_NEWS = {
  newsTitle: '', headline: '', newsContent: '', newsSource: '',
  categoryId: '', newsStatus: true, tags: [],
};

export default function NewsForm({ initialValue, categories, availableTags, onSubmit, onCancel, saving = false }) {
  const [form, setForm] = useState(INITIAL_NEWS);
  const isEditing = Boolean(initialValue?.newsArticleId);

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

  // Chỉ cho chọn danh mục Active. Nếu đang sửa bài viết cũ thuộc danh mục Inactive,
  // giữ danh mục đó dưới dạng option bị khóa để người dùng vẫn sửa được các trường khác.
  const currentCategoryId = initialValue?.category?.categoryId;
  const selectableCategories = categories.filter((category) =>
    Boolean(category.active) || (isEditing && String(category.categoryId) === String(currentCategoryId))
  );

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
      <label>Danh mục
        <select value={form.categoryId} onChange={(e) => setField('categoryId', e.target.value)}>
          <option value="">-- Chọn danh mục --</option>
          {selectableCategories.map((category) => {
            const isInactiveCurrentCategory = !Boolean(category.active) && String(category.categoryId) === String(currentCategoryId);
            return (
              <option key={category.categoryId} value={category.categoryId} disabled={isInactiveCurrentCategory}>
                {category.categoryName}{isInactiveCurrentCategory ? ' (Inactive - chỉ giữ bài viết cũ)' : ''}
              </option>
            );
          })}
        </select>
        <small>Chỉ danh mục Active được chọn cho bài viết mới hoặc khi đổi danh mục.</small>
      </label>
      <label>Tags
        <select multiple value={form.tags} onChange={(e) => setField('tags', Array.from(e.target.selectedOptions, (option) => option.value))}>
          {availableTags.map((tag) => <option key={tag.tagId} value={String(tag.tagId)}>{tag.tagName}</option>)}
        </select>
        <small>Giữ Ctrl (Windows) hoặc Command (Mac) để chọn nhiều tag.</small>
      </label>
      <label>Trạng thái
        <select value={String(form.newsStatus)} onChange={(e) => setField('newsStatus', e.target.value === 'true')}>
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
