// Author: Khôi Nguyên
import React, { useEffect, useState } from 'react';
import newsService from '../services/newsService';
import categoryService from '../services/categoryService';
import tagService from '../services/tagService';
import errorMessage from '../utils/errorMessage';
import NewsCard from '../components/NewsCard';
import Modal from '../components/Modal';
import NewsForm from '../components/forms/NewsForm';

export default function NewsPage({ user, search, onError }) {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([newsService.getAll(search), categoryService.getAll(), tagService.getAll()])
      .then(([newsData, categoryData, tagData]) => {
        if (!active) return;
        setNews(newsData);
        setCategories(categoryData);
        setTags(tagData);
      })
      .catch((error) => active && onError(errorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [search, reloadKey, onError]);

  function openCreate() { setEditing(null); setModalOpen(true); }
  function openEdit(item) { setEditing(item); setModalOpen(true); }

  async function save(formValue) {
    setSaving(true);
    onError('');
    const payload = {
      ...formValue,
      createdBy: { accountId: Number(editing?.createdBy?.accountId || user.accountId) },
      updatedBy: { accountId: Number(user.accountId) },
    };
    try {
      if (editing) await newsService.update(editing.newsArticleId, payload);
      else await newsService.create(payload);
      setModalOpen(false);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Bạn có chắc muốn xóa bài viết “${item.headline}”?`)) return;
    try {
      await newsService.remove(item.newsArticleId);
      setReloadKey((key) => key + 1);
    } catch (error) {
      onError(errorMessage(error));
    }
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Nội dung</p><h2>Quản lý bài viết</h2><span>{news.length} bài viết</span></div>
        <button type="button" onClick={openCreate}>+ Thêm bài viết</button>
      </div>
      {loading ? <p className="empty">Đang tải bài viết...</p> : news.length > 0 ? (
        <div className="cards">{news.map((item) => <NewsCard key={item.newsArticleId} news={item} onEdit={openEdit} onDelete={remove} />)}</div>
      ) : <p className="empty">Không tìm thấy bài viết phù hợp.</p>}
      {modalOpen && (
        <Modal title={`${editing ? 'Cập nhật' : 'Thêm'} bài viết`} onClose={() => setModalOpen(false)} size="wide">
          <NewsForm initialValue={editing} categories={categories} availableTags={tags} onSubmit={save} onCancel={() => setModalOpen(false)} saving={saving} />
        </Modal>
      )}
    </section>
  );
}
