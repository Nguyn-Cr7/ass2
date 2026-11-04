// Author: Khôi Nguyên
import React from 'react';

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString('vi-VN') : '';
}

export default function NewsCard({ news, publicMode = false, onEdit, onDelete }) {
  return (
    <article className="card" key={news.newsArticleId}>
      {!publicMode && (
        <div className="cardtop">
          <span className={`status ${news.newsStatus ? '' : 'off'}`}>{news.newsStatus ? 'Đang hoạt động' : 'Ẩn'}</span>
          <small>{formatDate(news.createdDate)}</small>
        </div>
      )}
      {publicMode && <small>{formatDate(news.createdDate)} · {news.category?.categoryName || 'Tin tức'}</small>}
      <h3>{news.headline}</h3>
      <p>{news.newsTitle}</p>
      {!publicMode && <p className="muted">{news.category?.categoryName || 'Chưa có danh mục'} · {news.createdBy?.accountName || news.createdBy?.accountId || 'N/A'}</p>}
      <p>{(news.newsContent || '').slice(0, 240)}{(news.newsContent || '').length > 240 ? '…' : ''}</p>
      <div className="tags">
        {(news.tags || []).map((tag) => <span key={tag.tagId}>#{tag.tagName}</span>)}
      </div>
      {!publicMode && (
        <div className="actions">
          <button type="button" className="secondary" onClick={() => onEdit(news)}>Sửa</button>
          <button type="button" className="danger" onClick={() => onDelete(news)}>Xóa</button>
        </div>
      )}
    </article>
  );
}
