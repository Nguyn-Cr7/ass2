// Author: Khôi Nguyên
import React from 'react';

// Định dạng chuỗi ngày tháng sang định dạng tiếng Việt (ngày/tháng/năm)
function formatDate(value) {
  return value ? new Date(value).toLocaleDateString('vi-VN') : '';
}

/**
 * Component hiển thị thẻ bài viết tin tức (dùng cho cả trang quản lý và trang chủ).
 */
export default function NewsCard({ news, publicMode = false, onEdit, onDelete }) {
  return (
    <article className="card" key={news.newsArticleId}>
      {/* Chế độ quản lý: hiển thị trạng thái và ngày tạo */}
      {!publicMode && (
        <div className="cardtop">
          <span className={`status ${news.newsStatus ? '' : 'off'}`}>
            {news.newsStatus ? 'Đang hoạt động' : 'Ẩn'}
          </span>
          <small>{formatDate(news.createdDate)}</small>
        </div>
      )}

      {/* Chế độ trang chủ: hiển thị ngày tạo và danh mục */}
      {publicMode && (
        <small>{formatDate(news.createdDate)} · {news.category?.categoryName || 'Tin tức'}</small>
      )}

      <h3>{news.headline}</h3>
      <p>{news.newsTitle}</p>

      {!publicMode && (
        <p className="muted">
          {news.category?.categoryName || 'Chưa có danh mục'} · {news.createdBy?.accountName || news.createdBy?.accountId || 'N/A'}
        </p>
      )}

      {/* Giới hạn hiển thị 240 ký tự nội dung */}
      <p>{(news.newsContent || '').slice(0, 240)}{(news.newsContent || '').length > 240 ? '…' : ''}</p>

      {/* Danh sách thẻ tag */}
      <div className="tags">
        {(news.tags || []).map((tag) => <span key={tag.tagId}>#{tag.tagName}</span>)}
      </div>

      {/* Nút thao tác Sửa và Xóa trong chế độ quản lý */}
      {!publicMode && (
        <div className="actions">
          <button type="button" className="secondary" onClick={() => onEdit(news)}>Sửa</button>
          <button type="button" className="danger" onClick={() => onDelete(news)}>Xóa</button>
        </div>
      )}
    </article>
  );
}
