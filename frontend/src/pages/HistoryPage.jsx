// Author: Khôi Nguyên
import React, { useEffect, useMemo, useState } from 'react';
import newsService from '../services/newsService';
import errorMessage from '../utils/errorMessage';

export default function HistoryPage({ user, search, onError }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    newsService.getHistory(user.accountId)
      .then((data) => active && setHistory(data))
      .catch((error) => active && onError(errorMessage(error)))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [user.accountId, onError]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return history;
    return history.filter((item) => [item.newsArticleId, item.headline, item.newsTitle, item.newsContent]
      .some((value) => String(value || '').toLowerCase().includes(query)));
  }, [history, search]);

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><p className="eyebrow">Hoạt động cá nhân</p><h2>Lịch sử bài viết của tôi</h2></div>
        <span>{filtered.length} bài viết</span>
      </div>
      {loading ? <p className="empty">Đang tải lịch sử...</p> : (
        <div className="tablewrap">
          <table>
            <thead><tr><th>Mã bài viết</th><th>Headline</th><th>Danh mục</th><th>Ngày tạo</th><th>Ngày sửa gần nhất</th><th>Trạng thái</th></tr></thead>
            <tbody>{filtered.map((item) => (
              <tr key={item.newsArticleId}>
                <td>{item.newsArticleId}</td><td>{item.headline}</td><td>{item.category?.categoryName || '—'}</td>
                <td>{item.createdDate ? new Date(item.createdDate).toLocaleString('vi-VN') : '—'}</td>
                <td>{item.modifiedDate ? new Date(item.modifiedDate).toLocaleString('vi-VN') : '—'}</td>
                <td><span className={`status ${item.newsStatus ? '' : 'off'}`}>{item.newsStatus ? 'Active' : 'Inactive'}</span></td>
              </tr>
            ))}</tbody>
          </table>
          {!filtered.length && <p className="empty">Chưa có bài viết hoặc không có kết quả phù hợp.</p>}
        </div>
      )}
    </section>
  );
}
