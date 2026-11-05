// Author: Khôi Nguyên
import React, { useState, useMemo } from 'react';
import PublicHeader from '../components/PublicHeader';
import NewsCard from '../components/NewsCard';

/**
 * PublicHomePage: Trang chủ tin tức công khai dành cho tất cả mọi người xem bài viết
 * - Không yêu cầu đăng nhập
 * - Hỗ trợ tìm kiếm theo từ khóa trực tiếp và lọc theo danh mục bài viết
 */
export default function PublicHomePage({
  user = null,
  homePath = '/news',
  publicNews = [],
  publicNewsLoading = false,
  publicNewsError = '',
  onRetryPublicNews,
}) {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Trích xuất danh sách các danh mục duy nhất từ các bài viết công khai
  const categories = useMemo(() => {
    const map = new Map();
    publicNews.forEach((item) => {
      if (item.category?.categoryId) {
        map.set(item.category.categoryId, item.category.categoryName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [publicNews]);

  // Lọc bài viết công khai theo từ khóa tìm kiếm và danh mục được chọn
  const filteredNews = useMemo(() => {
    return publicNews.filter((item) => {
      const matchKeyword = !keyword.trim() || 
        (item.headline || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (item.newsTitle || '').toLowerCase().includes(keyword.toLowerCase()) ||
        (item.newsContent || '').toLowerCase().includes(keyword.toLowerCase());

      const matchCategory = selectedCategory === 'ALL' || 
        item.category?.categoryId === selectedCategory;

      return matchKeyword && matchCategory;
    });
  }, [publicNews, keyword, selectedCategory]);

  return (
    <div className="homepage-wrapper">
      {/* Header công khai với nút Đăng nhập / Bảng điều khiển */}
      <PublicHeader user={user} homePath={homePath} />

      {/* HERO BANNER: Lời chào và ô tìm kiếm nổi bật */}
      <section className="homepage-hero">
        <div className="hero-content">
          <span className="hero-eyebrow">FUNews Management System</span>
          <h1>Cổng Thông Tin & Sự Kiện</h1>
          <p>Cập nhật những tin tức học thuật, hoạt động nghiên cứu và sự kiện nổi bật.</p>

          <div className="hero-search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, chủ đề sự kiện..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <button type="button" className="btn-clear-hero-search" onClick={() => setKeyword('')}>
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* DANH SÁCH BÀI VIẾT VÀ BỘ LỌC */}
      <main className="homepage-main-container">
        {/* Bộ nút lọc nhanh theo danh mục bài viết */}
        {categories.length > 0 && (
          <div className="category-filter-pills">
            <button
              type="button"
              className={`pill-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ALL')}
            >
              Tất cả chủ đề ({publicNews.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Trạng thái tải, báo lỗi hoặc hiển thị lưới bài viết qua NewsCard */}
        {publicNewsLoading ? (
          <div className="homepage-empty-box">
            <div className="loading-spinner"></div>
            <p>Đang tải dữ liệu tin tức từ hệ thống...</p>
          </div>
        ) : publicNewsError ? (
          <div className="homepage-error-box">
            <strong>Không thể kết nối đến máy chủ tin tức</strong>
            <p>{publicNewsError}</p>
            <button type="button" className="btn-secondary" onClick={onRetryPublicNews}>
              Thử tải lại
            </button>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="cards">
            {filteredNews.map((news) => (
              <NewsCard key={news.newsArticleId} news={news} publicMode />
            ))}
          </div>
        ) : (
          <div className="homepage-empty-box">
            <p>Không tìm thấy bài viết nào phù hợp với điều kiện tìm kiếm.</p>
          </div>
        )}
      </main>

      {/* Chân trang công khai */}
      <footer className="homepage-footer">
        <p>FUNewsManagementSystem · Assignment 02 · Author: <strong>Khôi Nguyên</strong></p>
      </footer>
    </div>
  );
}

