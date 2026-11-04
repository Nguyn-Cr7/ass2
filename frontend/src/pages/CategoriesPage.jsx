// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';
import errorMessage from '../utils/errorMessage';
import Modal from '../components/Modal';
import CategoryForm from '../components/forms/CategoryForm';

export default function CategoriesPage({ search, onError }) {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    categoryService.getAll(search)
      .then((data) => active && setCategories(data))
      .catch((error) => active && onError(errorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [search, reloadKey, onError]);

  async function save(payload) {
    setSaving(true);
    onError('');
    try {
      if (editing) await categoryService.update(editing.categoryId, payload);
      else await categoryService.create(payload);
      setModalOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function remove(category) {
    if (!window.confirm(`Bạn có chắc muốn xóa danh mục “${category.categoryName}”?`)) return;
    try {
      await categoryService.remove(category.categoryId);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Phân loại nội dung</p><h2>Quản lý danh mục</h2><span>{categories.length} danh mục</span></div>
        <button type="button" onClick={() => { setEditing(null); setModalOpen(true); }}>+ Thêm danh mục</button>
      </div>
      {loading ? <p className="empty">Đang tải danh mục...</p> : (
        <div className="tablewrap">
          <table>
            <thead><tr><th>ID</th><th>Tên danh mục</th><th>Mô tả</th><th>Danh mục cha</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
            <tbody>{categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td><td>{category.categoryName}</td><td>{category.categoryDescription}</td>
                <td>{category.parentCategoryId ?? '—'}</td>
                <td><span className={`status ${category.active ? '' : 'off'}`}>{category.active ? 'Active' : 'Inactive'}</span></td>
                <td className="table-actions">
                  <button type="button" className="secondary" onClick={() => { setEditing(category); setModalOpen(true); }}>Sửa</button>
                  <button type="button" className="danger" onClick={() => remove(category)}>Xóa</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
          {!categories.length && <p className="empty">Không tìm thấy danh mục phù hợp.</p>}
        </div>
      )}
      {modalOpen && (
        <Modal title={`${editing ? 'Cập nhật' : 'Thêm'} danh mục`} onClose={() => setModalOpen(false)}>
          <CategoryForm initialValue={editing} categories={categories} onSubmit={save} onCancel={() => setModalOpen(false)} saving={saving} />
        </Modal>
      )}
    </section>
  );
}
